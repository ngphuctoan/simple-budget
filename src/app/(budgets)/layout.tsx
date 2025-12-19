import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppMenu from "./ui/menu";

export default function BudgetsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar
        elevation={0}
        className="text-primary! bg-background-default! border-b border-divider"
      >
        <Toolbar variant="dense">
          <Typography variant="h6">Simple Budget</Typography>
          <div className="flex-1"></div>
          <AppMenu />
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      {children}
    </>
  );
}
