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
import { FaceRetouchingOffRounded } from "@mui/icons-material";
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
import { TableBody } from "mui-datatables";
import Filters from "../components/dashboard/filters";
import Members from "../components/verify/contractorSites/Members";
import FamilyDetails from "../components/verify/family/FamilyDetails";
import MemberDetailsHeader from "../components/verify/contractorSites/MemberDetailsHeader";
import EditFamily from "../components/verify/family/EditFamily";
import Families from "../components/verify/contractor/Families";
import CorpDetailsHeader from "../components/verify/corp/CorpDetailsHeader";
import Corp from "../components/verify/corp/Corp";
import AadharDetailsHeader from "../components/verify/Contractoraadhar/AadharDetailsHeader";
import Aadhar from "../components/verify/Contractoraadhar/Aadhar";
import ConsentDetailsHeader from "../components/verify/consent/ConsentDetailsHeader";
import ConsentHeader from "../components/verify/consent/ConsentHeader";
import DocumentsDetailsHeader from "../components/verify/consent/DocumentsDetailsHeader";
import DocumentsHeader from "../components/verify/consent/DocumentsHeader";
import Select from "react-select";
import { onDistrict } from "../network/actions/district";
import { onState } from "../network/actions/state";
import { onBlock } from "../network/actions/block";
import { contractorListrApi } from "../network/actions/contractorList";
import { contractorDetailsApiApi } from "../network/actions/contractorDetailsApi";
import FamilyDetailsHeader from "../components/verify/contractor/FamilyDetailsHeader";
const columns = [
    {
        id: "employerName",
        label: "Employer Name",
        minWidth: 170,
        align: "center",
        fontWeight: "bold",
    },

    {
        id: "employerPanTan",
        label: "Employer Pan/Tan",
        minWidth: 170,
        align: "center",
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: "employerRegistrationNo",
        label: "Registration No",
        minWidth: 170,
        align: "center",
        format: (value) => `XXXX-XXXX-${value
            .toString()
            .slice(-4)}`,
    },
    {
        id: "contractorType",
        label: "Contractor Type",
        align: "center",
        // format: (value) => value.toFixed(2),
    },
    {
        id: "pincode",
        label: "Pincode",
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
    height: "90vh",
    // overflow: "hidden",
    overflowY: "auto",
    p: 4,
    borderRadius: 2,
};



const ViewContractorData = () => {
    const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };
    const districtListData = useSelector((state) => state.district_reducer?.data);
    const stateListData = useSelector((state) => state.state?.data);
    const blockListData = useSelector((state) => state.block?.data);
    const contractorList = useSelector((state) => state.contractorListrApi?.data);
    const contractorDetails = useSelector((state) => state.contractorDetailsApi?.data);
    const [district, setDistrict] = useState({})
    const [districtList, setDistrictList] = useState([])
    const [block, setBlock] = useState({})
    const [blockList, setBlockList] = useState([])
    const [stateList, setStateList] = useState([]);


    const handleDistrictChange = (e) => {
        setDistrict(e)
        setBlock("")
        dispatch(onBlock(e.value));

    }
    const handleBlockChange = (e) => {
        setBlock(e)
    }

    useEffect(() => {
        dispatch(onDistrict());
        dispatch(onState());
    }, [])
    useEffect(() => {
        dispatch(contractorListrApi(district?.value, block?.value));
    }, [district, block])


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
    useEffect(() => {
        if (blockListData?.length > 0) {
            let block_list = [];
            block_list.push({
                label: "-- Please Select -- ",
                value: null,
                code: null,
            });
            for (let i = 0; i < blockListData.length; i++) {
                let object = {
                    label: blockListData[i].name + " (" + blockListData[i].id + ")",
                    value: blockListData[i].id,
                    code: blockListData[i].id,
                };
                block_list.push(object);

                setBlockList(block_list);
            }
        }
    }, [blockListData])


    const [wardId, setWardId] = useState();
    const [districtCode, setDistrictCode] = useState();
    const [municipalityId, setMunicipalityId] = useState();

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

    const [totalPages, settotalPages] = React.useState(0);

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

    const handleFilterChange = ({ district, municipal, ward, village }) => {
        setSelectedDistrict(district);
        setSelectedMunicipality(municipal);
        setSelectedWard(ward);
        setSelectedVillage(village)
        const queryParams = createQueryParamsDefault(
            0,
            100,
            district?.code,
            // municipal?.value,
            // ward?.id,
            // village?.value,
            1
        );
        dispatch(onFamiliesList(queryParams));
    };

    const handleCardClick = () => {
        setCardClicked(!isCardClicked);
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
            dispatch(onFamiliesList(queryParams));
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
            dispatch(onFamiliesList(queryParams));
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
        if (familiesList?.error) {
            setOpen(true);

            if (familiesList?.error?.response?.data?.message) {
                seterrorMessage(familiesList.error.response.data.message);
            }
        }
        if (familiesList?.data) {
            const { data, status, message, rationCardAlreadyExists } =
                familiesList.data || {};

            //dispatch(onShowLoader(true));

            // setrationList(data);

            if (familiesList?.data?.totalPages) {
                setTotalPage(familiesList?.data?.totalPages);
            }

            setfamilyList(familiesList?.data);
            // setfamilyList();
        } else {
            //console.warn(familiesList.);
        }
    }, [dispatch, familiesList]);

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
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel
                            style={{ marginBottom: 5 }}
                            id="demo-simple-select-helper-label"
                        >
                            Block{" "}
                        </InputLabel>

                        <Select
                            styles={selectStyles}
                            closeMenuOnSelect={true}
                            value={block}
                            options={blockList}
                            onChange={handleBlockChange}
                        />
                    </Grid>
                </Grid>
                {/* <Filters onChange={handleFilterChange} /> */}
                {errorMessage && (
                    <ErrorSnack open={open} setOpen={setOpen} message={errorMessage} />
                )}
                <main className="p-6 space-y-6">
                    <>
                        {contractorList &&
                            contractorList.content &&
                            contractorList.content.length > 0 ? (
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
                                            <TableContainer sx={{ height: "65vh" }}>
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
                                                        {contractorList?.content &&
                                                            contractorList?.content.map((row, index2) => {
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
                                                                                                        dispatch(
                                                                                                            contractorDetailsApiApi(
                                                                                                                row?.id
                                                                                                            )
                                                                                                        );
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
                                                        Total Records Found: {contractorList.totalElements}
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

                        <div className="p-4 flex-grow">
                            <Modal
                                open={showModal}
                                onClose={() => {
                                    setShowModal(false);
                                }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className="modalMain">
                                    <div style={{}}   >
                                        <Grid container   >
                                            <Grid item={true} xs={11.5}   >
                                                <FamilyDetailsHeader />
                                            </Grid>

                                            <Grid
                                                item={true}
                                                xs={0.5}
                                                style={{
                                                    justifyContent: "flex-end",
                                                    alignContent: "flex-end",
                                                    alignItems: "flex-end",
                                                }}
                                            >
                                                <IconButton
                                                    aria-label="delete"
                                                    size="small"
                                                    onClick={() => { setShowModal(false); dispatch(fetchFamiliesDetSuccess({})); }}
                                                >
                                                    <HighlightOffIcon fontSize="medium" />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Paper elevation={3} variant="elevation">
                                            <Families selectedFamily={contractorDetails} />
                                        </Paper>


                                        <Divider>&nbsp; &nbsp;</Divider>
                                        {contractorDetails?.sites && <><Grid container>
                                            <Grid item={true} xs={12}>
                                                <MemberDetailsHeader />
                                            </Grid>
                                        </Grid>
                                            {contractorDetails?.sites &&
                                                <Paper
                                                    elevation={3}
                                                    variant="elevation"
                                                    style={{ marginBottom: 8 }}

                                                >
                                                    {contractorDetails?.sites?.map((k,i) => (

                                                        <Members memberObject={k} key={ i} />
                                                    ))}
                                                </Paper>
                                            }</>}
                                    </div>


                                    {contractorDetails?.aadhaarDetailsContractor && <><Grid container>
                                        <Grid item={true} xs={12}>
                                            <AadharDetailsHeader />
                                        </Grid>
                                    </Grid>

                                        <Paper elevation={3} variant="elevation">
                                            <Aadhar selectedFamily={contractorDetails?.aadhaarDetailsContractor} />
                                        </Paper></>}
                                    <Divider>&nbsp; &nbsp;</Divider>

                                    {selectedFamily?.workerConsentURL && <> <Grid container>
                                        <Grid item={true} xs={12}>
                                            <ConsentDetailsHeader />
                                        </Grid>


                                    </Grid>
                                        <Paper elevation={3} variant="elevation">
                                            {selectedFamily && (
                                                <ConsentHeader selectedFamily={selectedFamily} />
                                            )}
                                        </Paper> </>}
                                    {selectedFamily?.documents && <> <Grid container>
                                        <Grid item={true} xs={12}>
                                            <DocumentsDetailsHeader />
                                        </Grid>


                                    </Grid>
                                        <Paper elevation={3} variant="elevation">
                                            {selectedFamily && (
                                                <DocumentsHeader selectedFamily={selectedFamily?.documents} />
                                            )}
                                        </Paper> </>}
                                </Box>
                            </Modal>
                        </div>
                    </>
                </main>
            </Layout>
        </>
    );
};

export default ViewContractorData;
