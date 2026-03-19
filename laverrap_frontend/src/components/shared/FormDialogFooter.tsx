import { Button, DialogClose, DialogFooter } from "../ui";
interface Props {
    isSubmitting: boolean;
}
export const FormDialogFooter = ({ isSubmitting }: Props) => {
  return (
    <DialogFooter className="col-span-2">
      <DialogClose render={ 
        <Button type="button" variant={"outline"} title="Cancelar" className="min-w-32">
          Cancelar
        </Button>}>
      </DialogClose>
      <Button type="submit" variant={"default"} title="Guardar" className="min-w-32" disabled={isSubmitting}>
            Guardar
      </Button>
    </DialogFooter>
  );
};