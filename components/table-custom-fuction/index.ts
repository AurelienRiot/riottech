import type { SubscriptionHistory } from "@prisma/client";
import type { Status } from "./common-cell";

export function createStatus(history: SubscriptionHistory): Status {
  return history.price === 0 ? "Validée" : history.mailSend ? "Paiement validé" : "En attente de paiement";
}
