import { DownloadIcon } from "lucide-react";
import { Button } from "../ui";
import type { ButtonHTMLAttributes } from "react";

export const ButtonDownloadPDF = ( props : ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button type="button" title="Descargar PDF" variant={"outline"} {...props}>
      <DownloadIcon />
      Descargar PDF
    </Button>
  );
};