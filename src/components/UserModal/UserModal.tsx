import { useEffect } from "react";
import { setCloseUserModal } from "@/store/slices/usersSlice";
import styles from "./UserModal.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { User } from "@/store/types";
import { Button } from "@/ui/Button/Button";

export const UserModal = () => {
  const dispatch = useAppDispatch();
  const {
    users,
    modals: { isShowUserModal, activeUserId },
  } = useAppSelector((state) => state.usersSlice);

  useEffect(() => {
    if (document) {
      document.body.style.overflow = isShowUserModal ? "hidden" : "auto";
    }
  }, [isShowUserModal]);

  if (!isShowUserModal) {
    return null;
  }

  const activeUser = users?.find((user) => user.id === activeUserId);
  const {
    firstName,
    lastName,
    maidenName,
    age,
    email,
    phone,
    height,
    weight,
    address: { address, city },
  } = activeUser as User;

  const handleClick = () => {
    dispatch(setCloseUserModal());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.stopPropagation();
    }
  };

  return (
    <div
      className={styles.modal}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>User info</h3>
        </div>
        <div className={styles.body}>
          <div className={styles.userData}>
            <p>
              Full Name:{" "}
              <span className={styles.text}>
                {firstName} {lastName} {maidenName}
              </span>
            </p>
            <p>
              Age: <span className={styles.text}>{age}</span>
            </p>
            <p>
              height: <span className={styles.text}>{height}</span>
            </p>
            <p>
              Weight: <span className={styles.text}>{weight}</span>
            </p>
            <p>
              Address:{" "}
              <span className={styles.text}>
                {address}, {city}
              </span>
            </p>
            <p>
              Phone: <span className={styles.text}>{phone}</span>
            </p>
            <p>
              Email: <span className={styles.text}>{email}</span>
            </p>
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={handleClick} aria-label="close modal">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
