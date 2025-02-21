import React, { useEffect, useState } from "react";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onFamiliesList } from "../network/actions/familiesList";
import { fetchFamiliesDetSuccess, onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { onShowLoader } from "../network/actions/showLoader";
import { getDistrict, getPanchayat, getRoles, getToken, getVillage } from "../utils/cookie";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Close, FaceRetouchingOffRounded } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ClosedCaption } from "@mui/icons-material";
import ErrorSnack from "../utils/ErrorSnack";
import Select from "react-select";
import { onDistrict } from "../network/actions/district";
import { onState } from "../network/actions/state";
import { siteMasterApi } from "../network/actions/siteMaster";

const columns = [
  {
    id: "siteName",
    label: "Site Name",
    minWidth: 170,
    align: "center",
    fontWeight: "bold",
  },
  { id: "siteOwnerName", label: "Site Owner Name", minWidth: 100, align: "center" },

  {
    id: "noOfWorkers",
    label: "No. Of Workers",
    minWidth: 100,
    align: "center",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "pincode",
    label: "Pincode",
    minWidth: 100,
    align: "center",
    format: (value) => `XXXX-XXXX-${value
      .toString()
      .slice(-4)}`,
  },
  {
    id: "workAssignedBy",
    label: "Work Assigned By",
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "view",
    label: "Action",
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #83a2b2",
  boxShadow: 30,
  // height: "90vh",
  // overflow: "hidden",
  overflowY: "auto",
  p: 4,
  borderRadius: 2,
};



const ViewSiteData = () => {
  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };
  const districtListData = useSelector((state) => state.district_reducer?.data);
  const stateListData = useSelector((state) => state.state?.data);
  const siteMastertData = useSelector((state) => state.siteMaster?.data?.content);
  const siteMastertDataPage = useSelector((state) => state.siteMaster?.data);
  const [district, setDistrict] = useState({})
  const [districtList, setDistrictList] = useState([])
  const [stateList, setStateList] = useState([]);



  const handleDistrictChange = (e) => {
    setDistrict(e)
  }

  useEffect(() => {
    dispatch(onDistrict());
    dispatch(onState());
  }, [])

  useEffect(() => {

    dispatch(siteMasterApi(district?.value || null, page));
  }, [district])

  useEffect(() => {
    if (districtListData?.length > 0) {
      let district_list = [];
      district_list.push({
        label: "-- Please Select -- ",
        value: null,
        code: null,
      });
      for (let i = 0; i < districtListData.length; i++) {
        let object = {
          label: districtListData[i].name + " (" + districtListData[i].id + ")",
          value: districtListData[i].id,
          code: districtListData[i].id,
        };
        district_list.push(object);

        setDistrictList(district_list);
      }
    }
  }, [districtListData])
  useEffect(() => {
    if (stateListData?.length > 0) {
      let state_list = [];
      state_list.push({
        label: "-- Please Select -- ",
        value: null,
        code: null,
      });
      for (let i = 0; i < stateListData.length; i++) {
        let object = {
          label: stateListData[i].name + " (" + stateListData[i].id + ")",
          value: stateListData[i].id,
          code: stateListData[i].id,
        };
        state_list.push(object);

        setStateList(state_list);
      }
    }
  }, [stateListData])




  const [selectedItems, setSelectedItems] = useState([]);
  const [familyList, setfamilyList] = useState([]);
  const [selectedFamily, setselectedFamily] = useState({});
  const [detailCalled, setdetailCalled] = useState(false);
  const [isCardClicked, setCardClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");


  /**Handle Filters and Call the External Service */
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const dispatch = useDispatch();
  const familiesList = useSelector((state) => state.familiesList);

  const familiesDetailApi = useSelector((state) => state.familiesDetailApi);


  const [isAdmin, setIsAdmin] = useState(false);
  // const globalUser = getToken();
  const router = useRouter();

  useEffect(() => {
    const roles = JSON.parse(getRoles());
    // const { roles } = globalUser || {};
    // setIsAdmin(roles && roles.length > 0 && roles[0] === "Admin");
    setIsAdmin(
      roles &&
      roles.length > 0 &&
      (roles[0] === "Admin" || roles[0] === "Verifying Authority")
    );
  }, []);



  useEffect(() => {
    if (familiesDetailApi?.data?.firstName) {
      // const { data, status, message, rationCardAlreadyExists } =
      //   familiesList.data || {};
      setShowModal(true);
      // setrationList(data);

      setselectedFamily(familiesDetailApi?.data);
      setdetailCalled(false);
    }
  }, [familiesDetailApi]);
  useEffect(() => {
    // setShowModal(false);

    if (siteMastertDataPage) {
      // const { data, status, message, rationCardAlreadyExists } =
        // familiesList.data || {};

      //dispatch(onShowLoader(true));

      // setrationList(data);

      if (siteMastertDataPage?.totalPages) {
        setTotalPage(siteMastertDataPage?.totalPages);
      }

      // setfamilyList(familiesList?.data);
      // setfamilyList();
    } else {
      //console.warn(familiesList.);
    }
  }, [dispatch, siteMastertDataPage]);

  const createQueryParamsDefault = (
    pageNumber,
    pageSize,
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    selectedVillage,
    verificationStatusId
  ) => {
    const queryParams = {};
    if (pageNumber) queryParams.page = pageNumber;
    if (pageSize) queryParams.size = pageSize;
    if (selectedDistrict) queryParams.districtCode = selectedDistrict;
    if (selectedMunicipality) queryParams.blockCode = selectedMunicipality;
    if (selectedWard) queryParams.panchayatCode = selectedWard;
    if (selectedVillage) queryParams.villageCode = selectedVillage;
    // if (verificationStatusId)
    //   queryParams.verificationStatusId = verificationStatusId;


    return queryParams;
  };

  // select default
  useEffect(() => {
    const districtDetail = JSON.parse(getDistrict());
    // const municipalityDetail = JSON.parse(getPanchayat());
    // const ulb = JSON.parse(getVillage());
    // const { districtDetail, municipalityDetail, ulb, roles } = globalUser || {};

    const queryParams = createQueryParamsDefault(
      0,
      100,
      // districtDetail?.id,
      // municipalityDetail?.municipalId,
      // ulb?.id,

    );
    dispatch(onFamiliesList(queryParams));
  }, []);

  //Testing Working Code
  const handleSendtoedit = (himParivarId, RationCard) => {

    // Construct the URL with query parameters
    const queryParam = new URLSearchParams({
      himParivarId,
      RationCard,
    }).toString();
    router.push(`/edit_modify?${queryParam}`);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (selectedDistrict) {
      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        selectedDistrict?.code,
        // selectedMunicipality?.municipalId,
        // selectedWard?.id,
        1
      );
      dispatch(siteMasterApi(district?.value || null, newPage - 1));

    } else {
      const globalUser = JSON.parse(getDistrict());

      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        globalUser?.id,
        // municipalityDetail?.municipalId,
        // ulb?.id,
        1
      );
      dispatch(siteMasterApi(district?.value || null, newPage - 1));
    }
  };
  return (
    <>
      <Layout>
        <Grid container spacing={4} style={{ flex: 1, padding: 20 }}>
          <Grid item xs={4}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              State{" "}
            </InputLabel>

            <Select
              styles={selectStyles}
              closeMenuOnSelect={true}
              value={{ label: "HIMACHAL PRADESH (2)", value: 2, code: 2 }}
              options={stateList}
              isDisabled
            // onChange={handleDistrictChange}
            // isDisabled={selectDisabledDistrict}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              District{" "}
            </InputLabel>

            <Select
              styles={selectStyles}
              closeMenuOnSelect={true}
              value={district}
              options={districtList}
              onChange={handleDistrictChange}
            // isDisabled={selectDisabledDistrict}
            />
          </Grid>
        </Grid>
        {/* <Filters onChange={handleFilterChange} /> */}
        {errorMessage && (
          <ErrorSnack open={open} setOpen={setOpen} message={errorMessage} />
        )}
        <main className="p-6 space-y-6">
          <>
            {siteMastertData?.length > 0 ? (
              <Grid container sx={{ background: "#FFF", borderRadius: 6 }}>
                <Grid
                  item={true}
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ background: "#FFF", borderRadius: 6 }}
                >
                  <div
                    style={{
                      display: "table",
                      tableLayout: "fixed",
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  >
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ height: "80vh" }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns &&
                                columns.map((column, index) => (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      minWidth: column.minWidth,
                                      background: "#074465",
                                      color: "#FFF",
                                    }}
                                  >
                                    {column.label}
                                  </TableCell>
                                ))}
                            </TableRow>
                          </TableHead>
                          {siteMastertData &&
                            siteMastertData?.map((row, index2) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={index2}
                                >
                                  {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        className="hoverable-cell"
                                        key={column.id}
                                        align={column.align}
                                        fontWeight={column.fontWeight}
                                      >
                                        {column.format &&
                                          typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                        {index > 4 && (
                                          <>
                                            <Stack spacing={2} direction="row">

                                              {isAdmin && (
                                                <Button
                                                  color="success"
                                                  startIcon={
                                                    <RemoveRedEyeIcon />
                                                  }
                                                  onClick={(handleEvent) => {

                                                    setSelectedItems(row);
                                                    setdetailCalled(true);
                                                    dispatch(
                                                      onFamiliesDetailApi(
                                                        row.himParivarId,
                                                        row.rationCardNo
                                                      )
                                                    );
                                                  }}
                                                >
                                                  View
                                                </Button>
                                              )}
                                              {isAdmin && (
                                                <Button
                                                  color="error"
                                                  startIcon={<ModeEditIcon />}
                                                  onClick={() =>
                                                    handleSendtoedit(
                                                      row.himParivarId,
                                                      row.rationCardNo
                                                    )
                                                  }
                                                >
                                                  Verify
                                                </Button>
                                              )}
                                              {!isAdmin && (
                                                <Button
                                                  color="success"
                                                  startIcon={
                                                    <RemoveRedEyeIcon />
                                                  }
                                                  onClick={(handleEvent) => {

                                                    setSelectedItems(row);
                                                    setdetailCalled(true);
                                                    setShowModal(true);
                                                    // dispatch(
                                                    //   onFamiliesDetailApi(
                                                    //     row?.id
                                                    //   )
                                                    // );
                                                  }}
                                                >
                                                  View
                                                </Button>
                                              )}
                                            </Stack>
                                          </>
                                        )}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </Table>
                      </TableContainer>

                      <Box
                        style={{
                          padding: 10,
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography textAlign={"center"}>
                          Total Records Found: {siteMastertDataPage.totalElements}
                        </Typography>
                        <Pagination
                          style={{
                            padding: 10,
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          count={totalPage}
                          onChange={handleChangePage}
                          color="primary"
                        />
                      </Box>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <div>
                {/* This is the "else" case, modify as needed */}
                <p>No data available.</p>
              </div>
            )}

            <div className="p-4">
              <Modal
                open={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
              >
                <Box sx={style} className="modalMain" padding={3} height={"auto"}>
                  <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                    <Box fontSize={16} flex={1} backgroundColor={'#074465'} color={"white"} fontWeight={"bold"} mb={4} paddingLeft={"16px"} borderRadius={"4px"} paddingTop={"7px"} paddingBlock={"7px"}>Site Details</Box>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => { setShowModal(false); }}
                      style={{marginTop : "-30px"}}
                    >
                      <HighlightOffIcon fontSize="medium" />
                    </IconButton>
                 </Box>
                  <Grid container spacing={3} padding={3} paddingTop={1}>
                    <Grid items sx={12} md={4} mb={3}>
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>Site Name: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.siteName}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid items sx={12} md={4}>
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>Site Owner Name: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.siteOwnerName}
                        </Typography>
                      </Box>

                    </Grid>

                    <Grid items sx={12} md={4}>
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>Date Of Commencement: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.dateOfCommencement}
                        </Typography>
                      </Box>

                    </Grid>
                    <Grid items sx={12} md={4}>
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>No. of Workers: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.noOfWorkers}
                        </Typography>
                      </Box>

                    </Grid>
                    <Grid items sx={12} md={4} mb={3}>
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>Address: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.address}
                        </Typography>
                      </Box>

                    </Grid>
                    <Grid items sx={12} md={4}>
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>Date Of Completion: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.dateOfCompletion}
                        </Typography>
                      </Box>

                    </Grid>

                    <Grid items sx={12} md={4} >
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>Pincode: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.pincode}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid items sx={12} md={4}>
                      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography color={"#396984"} fontWeight={"bold"} paddingRight={"5px"}>Assigned By: </Typography>
                        <Typography color={"#555"} fontWeight={"bold"} paddingLeft={"5px"}>
                          {selectedItems?.workAssignedBy}
                        </Typography>
                      </Box>
                    </Grid>

                  </Grid>
                </Box>
              </Modal>
            </div>
          </>
        </main>
      </Layout>
    </>
  );
};

export default ViewSiteData;
