import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { useCallback } from "react";
import { DeleteIcon } from "../icons/table/delete-icon";

type Props = {
  submit: () => void;
  title: string;
  description: string;
}

export const Delete = ({ submit, title, description }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleDelete = useCallback(async () => {
    submit();
    onClose();
  }, []);

  return (
    <div>
      <>
        <Tooltip
          content={title}
          color="danger"
        >
          <button
            onClick={onOpen}
          >
            <DeleteIcon size={20} fill="#c70808" />
          </button>
        </Tooltip>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {title}
                </ModalHeader>
                <ModalBody>
                  {description}
                </ModalBody>
                <ModalFooter className="justify-between">
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" onPress={handleDelete}>
                    Deletar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
