import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="flex justify-center items-center max-w-[1200px] h-[600px] p-4 sm:p-8 mx-auto">
      <CircularProgress enableTrackSlot size="3rem" />
    </div>
  );
}
