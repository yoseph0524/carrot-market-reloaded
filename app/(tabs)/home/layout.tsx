export default function HomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  console.log(modal);

  return (
    <>
      {children}
      {modal}
    </>
  );
}
