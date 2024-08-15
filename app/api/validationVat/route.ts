import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function POST(req: Request) {
  try {
    const { countryCode, vatNumber } = await req.json();

    const url = "http://ec.europa.eu/taxation_customs/vies/services/checkVatService";
    const headers = { "Content-Type": "text/xml" };
    const body = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
                <soapenv:Header/>
                <soapenv:Body>
                    <urn:checkVat>
                        <urn:countryCode>${countryCode}</urn:countryCode>
                        <urn:vatNumber>${vatNumber}</urn:vatNumber>
                    </urn:checkVat>
                </soapenv:Body>
            </soapenv:Envelope>
        `;

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.text();
    const result = await parseStringPromise(data);
    const checkVatResponse = result["env:Envelope"]["env:Body"][0]["ns2:checkVatResponse"][0];

    const requestDate = checkVatResponse["ns2:requestDate"][0];
    const isValid = checkVatResponse["ns2:valid"][0];
    const name = checkVatResponse["ns2:name"][0];
    const address = checkVatResponse["ns2:address"][0];

    return NextResponse.json({
      requestDate: requestDate,
      isValid: isValid,
      name: name,
      address: address,
    });
  } catch (error) {
    console.log("[VAT_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
