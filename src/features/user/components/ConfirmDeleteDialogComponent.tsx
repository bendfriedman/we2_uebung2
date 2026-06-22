import type { IUser } from "../../login/state/loginSlice";

interface ConfirmDeleteDialogComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: IUser | null;
}

const ConfirmDeleteDialogComponent = ({ isOpen, onClose, onConfirm, user }: ConfirmDeleteDialogComponentProps) => {
  if (!isOpen) return null;
  return (
    <div id={`DeleteDialogUser${user?.userID}`} className="modal d-block" onClick={() => onClose()}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete User {user?.userID}?</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose()}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete the user {user?.firstName} {user?.lastName}?
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" id="DeleteDialogCancelButton" className="btn btn-secondary" onClick={() => onClose()}>
              Cancel
            </button>
            <button
              type="button"
              id="DeleteDialogConfirmButton"
              className="btn btn-primary"
              onClick={() => {
                onConfirm();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialogComponent;
