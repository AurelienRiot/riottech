"use client";
import { addDelay } from "@/lib/utils";
import { _Object } from "@aws-sdk/client-s3";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { deleteObject, listFiles, uploadFile } from "./server";

const bucketName = process.env.NEXT_PUBLIC_SCALEWAY_BUCKET_NAME as string;

type UploadImageProps = {
  selectedFiles: string[];
  setSelectedFiles: Dispatch<SetStateAction<string[]>>;
  multipleImages?: boolean;
};

const UploadImage = ({
  selectedFiles,
  setSelectedFiles,
  multipleImages = false,
}: UploadImageProps) => {
  const [files, setFiles] = useState<_Object[]>([]);
  const [displayFiles, setDisplayFiles] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const formData = new FormData();
    Array.from(event.target.files).forEach((file) => {
      formData.append(file.name, file);
    });

    const result = await uploadFile({
      bucketName,
      formData,
    });
    if (!result) {
      toast.error("Une erreur est survenue dans l'envoi des fichiers");
      return;
    }
    await addDelay(1000);

    const updatedFiles = await listFiles(bucketName);
    if (!updatedFiles) {
      toast.error("Une erreur est survenue dans la récuperation des fichiers");
      return;
    }

    setFiles(updatedFiles);
    if (multipleImages) {
      setSelectedFiles((prev) => [...prev, ...result]);
    } else {
      setSelectedFiles([result[0]]);
    }
  };

  const onDelete = async (key: string | undefined) => {
    if (!key) {
      toast.error("key not found");
      return;
    }
    const deleted = await deleteObject({
      bucketName,
      key,
    });

    if (deleted.success) {
      setFiles((prev) => prev.filter((file) => file.Key !== key));
      setSelectedFiles((prev) => prev.filter((file) => file !== key));
      toast.success("Image supprimée");
    } else {
      toast.error(deleted.error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await listFiles(bucketName);
      if (!files) {
        return;
      }
      setFiles(files);
    };
    fetchFiles();
  }, []);

  return (
    <div className="flex flex-col justify-left gap-4 p-4">
      <div className="flex gap-4 justify-left items-center">
        <label className="relative w-fit flex flex-col items-center justify-center px-4  py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors ">
          <div className=" text-center">
            <div className=" border p-2 rounded-md max-w-min mx-auto bg-foreground">
              <UploadCloud size={20} className="text-primary-foreground" />
            </div>

            <p className="mt-2 text-sm text-primary">
              <span className="font-semibold">
                {multipleImages ? "Ajouter des images" : "Ajouter une image"}
              </span>
            </p>
          </div>
          <Input
            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple={multipleImages}
          />
        </label>
        {/* <Button
          className=" w-fit "
          onClick={async (e) => {
            e.preventDefault();
            const files = await listFiles(bucketName);
            if (!files) {
              return;
            }
            files.sort(
              (a, b) =>
                new Date(b.LastModified ?? 0).getTime() -
                new Date(a.LastModified ?? 0).getTime()
            );
            setFiles(files);
          }}
        >
          Rechercher les images
        </Button> */}
      </div>

      {selectedFiles.length !== 0 && (
        <div key={selectedFiles.join("")}>
          <h1 className="text-primary">
            {" "}
            {multipleImages ? "Images selectionnées" : "Image selectionnée"}
          </h1>
          <ul className="flex flex-wrap gap-2">
            {selectedFiles.map((key) => (
              <li
                key={key}
                onClick={() =>
                  setSelectedFiles((prev) =>
                    prev.filter((item) => item !== key)
                  )
                }
                className="cursor-pointer hover:ring-2 rounded-xl relative aspect-square h-[100px] bg-transparent"
              >
                <Image
                  src={`https://${bucketName}.s3.fr-par.scw.cloud/${key}`}
                  alt=""
                  fill
                  className="object-cover rounded-xl"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-4">
        <p className="font-medium my-2 mt-6 text-primary text-sm">
          Images disponibles
        </p>
        <Switch
          onCheckedChange={() => {
            setDisplayFiles(!displayFiles);
          }}
          checked={displayFiles}
        />
        {files.length > 0 && displayFiles && (
          <>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher"
              className="w-fit"
            />
            <div
              className="flex flex-row flex-wrap p-2 gap-4 max-w-[1000px]
            whitespace-nowrap"
            >
              {files
                .filter(
                  (file) =>
                    !selectedFiles.includes(file.Key ?? "") &&
                    file.Key?.toLowerCase().includes(search.toLowerCase())
                )
                .slice(
                  (currentPage - 1) * imagesPerPage,
                  currentPage * imagesPerPage
                )
                .map((file) => (
                  <div
                    key={file.Key}
                    className="flex justify-left gap-2 rounded-lg overflow-hidden border border-slate-100 group pr-2 hover:border-slate-300 transition-all relative"
                  >
                    <div
                      className="flex items-center flex-1 p-2 w-fit cursor-pointer"
                      onClick={(e) => {
                        if (multipleImages) {
                          setSelectedFiles((prev) => [...prev, file.Key ?? ""]);
                        } else {
                          setSelectedFiles([file.Key ?? ""]);
                        }
                      }}
                    >
                      <div className="text-white rounded-xl relative aspect-square h-10">
                        <Image
                          src={`https://${bucketName}.s3.fr-par.scw.cloud/${file.Key}`}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div
                        className="w-fit
                     ml-2 space-y-1"
                      >
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">
                            {file.Key?.slice(37)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete(file.Key);
                      }}
                      className="bg-red-500 absolute right-0 hover:bg-red-500/90 text-white transition-all items-center justify-center px-2 hidden group-hover:flex rounded-tr-md"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-start space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => prev - 1);
                }}
                disabled={currentPage === 1}
              >
                Précedent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => prev + 1);
                }}
                disabled={
                  currentPage * imagesPerPage >=
                  files.length - selectedFiles.length
                }
              >
                Suivant
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
