import { Fade, Snackbar } from "@mui/material";

export default function ErrorSnack(props) {
  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    props.setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Fade}
        message={props.message}
        autoHideDuration={1200}
      />
    </>
  );
}
