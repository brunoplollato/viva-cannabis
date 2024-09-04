import { UserService } from "@/services/users";
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

export const DeleteUser = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleDelete = useCallback(async () => {
    await UserService.delete(id);
    onClose();
  }, []);

  return (
    <div>
      <>
        <Tooltip
          content="Delete user"
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
                  Deletar usuário
                </ModalHeader>
                <ModalBody>
                  Você está prestes a deletar um usuário
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
