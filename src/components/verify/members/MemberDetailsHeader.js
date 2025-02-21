import { Box, Divider, Paper, Typography } from "@mui/material";

export default function MemberDetailsHeader() {
  return (
    <>
      <Typography
        fontWeight="300"
        style={{ fontSize: 16 }}
        color="#FFF"
        backgroundColor="#074465"
        borderRadius={0.5}
        textAlign="left"
        paddingLeft={2}
      >
        Employment Details
      </Typography>
      {/* Headings */}
      <Divider />
      <Paper
        elevation={6}
        variant="elevation"
        style={{
          marginBottom: 8,
          display: "flex",
        }}
      >
        <Box
          display="flex"
          width="100%"
          padding={1}
          backgroundColor="#396984"
          color="#FFF"
          justifyContent="space-between"
          mb={1}
        >
          <Box flexBasis="15%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Type of Employment</Typography>
          </Box>
          <Box flexBasis="14%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Contractor Name</Typography>
          </Box>
          <Box flexBasis="16%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Site Name</Typography>
          </Box>
          <Box flexBasis="10%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">
            Employment Months
            </Typography>
          </Box>
          <Box flexBasis="17%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">
           Employment Start Date
            </Typography>
          </Box>
          <Box flexBasis="18%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">
           Employment End Date
            </Typography>
          </Box>
          <Box flexBasis="20%"></Box>
        </Box>
      </Paper>
    </>
  );
}
