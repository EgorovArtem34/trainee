import { SearchPanel } from "@/components/SearchPanel/SearchPanel";
import { UserModal } from "@/components/UserModal/UserModal";
import { UsersContent } from "@/components/UsersContent/UsersContent";

export const MainPage = () => {
  return (
    <>
      <SearchPanel />
      <UsersContent />
      <UserModal />
    </>
  );
};
