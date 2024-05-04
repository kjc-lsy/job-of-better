import React from "react";
import classNames from "classnames";

// reactstrap components
import {
    Button,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    InputGroup,
    Modal,
    ModalHeader,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
} from "reactstrap";
import {useAuth} from "../../contexts/AuthContextProvider";
import {useLocation, useNavigate} from "react-router-dom";
import FixedPlugin from "../Plugin/FixedPlugin";

function CommonNavbar(props) {
    const [collapseOpen, setcollapseOpen] = React.useState(false);
    const [modalSearch, setmodalSearch] = React.useState(false);
    const [color, setcolor] = React.useState("navbar-transparent");
    const {logoutSetting} = useAuth();
    const navigate = useNavigate();
    const {user} = useAuth();

    let location = useLocation();
    let pathLayout = location.pathname.split("/")[1];
    let pathPage = location.pathname.split("/")[2];

    React.useEffect(() => {
        window.addEventListener("resize", updateColor);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.removeEventListener("resize", updateColor);
        };
    });
    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    const updateColor = () => {
        if (window.innerWidth < 993 && collapseOpen) {
            setcolor("bg-white");
        } else {
            setcolor("navbar-transparent");
        }
    };
    // this function opens and closes the collapse on small devices
    const toggleCollapse = () => {
        if (collapseOpen) {
            setcolor("navbar-transparent");
        } else {
            setcolor("bg-white");
        }
        setcollapseOpen(!collapseOpen);
    };
    // this function is to open the Search modal
    const toggleModalSearch = () => {
        setmodalSearch(!modalSearch);
    };

    function searchForm(value) {
        try {
           // const response = search(value);
        }
        catch {

        }
    }

    const logout = (e) => {
        e.preventDefault()
        logoutSetting()
        navigate("/")
    };
    return (
        <>
            <Navbar className={classNames("navbar-absolute" , color)} expand="lg">
                <Container fluid>
                    <div className="navbar-wrapper">

                        {pathLayout !== "auth"
                            ?
                            <div>
                                <div
                                    className={classNames("navbar-toggle d-inline", {
                                        toggled: props.sidebarOpened,
                                    })}
                                >
                                    <NavbarToggler onClick={props.toggleSidebar}>
                                        <span className="navbar-toggler-bar bar1"/>
                                        <span className="navbar-toggler-bar bar2"/>
                                        <span className="navbar-toggler-bar bar3"/>
                                    </NavbarToggler>
                                </div>
                                <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                                    {props.brandText}
                                </NavbarBrand>
                            </div>
                            :
                            null
                        }
                    </div>
                    <NavbarToggler onClick={toggleCollapse}>
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                    </NavbarToggler>
                    {pathLayout !== "auth" ?
                        <Collapse navbar isOpen={collapseOpen}>
                            <Nav className="ml-auto" navbar>
                                <InputGroup className="search-bar">
                                <FixedPlugin bgColor={color} sideColor={props.sideColor} handleBgClick={props.changeColor}/>
                                </InputGroup>
                                <InputGroup className="search-bar">
                                    <Button color="link" onClick={toggleModalSearch}>
                                        <i className="tim-icons icon-zoom-split" />
                                        <span className="d-lg-none d-md-block">Search</span>
                                    </Button>
                                </InputGroup>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        data-toggle="dropdown"
                                        nav
                                    >
                                        <div className="notification d-none d-lg-block d-xl-block" />
                                        <i className="tim-icons icon-sound-wave" />
                                        <p className="d-lg-none">Notifications</p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Mike John responded to your email
                                            </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                You have 5 more tasks
                                            </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Your friend Michael is in town
                                            </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Another notification
                                            </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Another one
                                            </DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        nav
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <div className="photo">
                                            <img alt="..." src={user.profileImg ? user.profileImg : require("assets/img/anime3.png")} />
                                        </div>
                                        <b className="caret d-none d-lg-block d-xl-block" />
                                        <p className="d-lg-none">Log out</p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Profile</DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Settings</DropdownItem>
                                        </NavLink>
                                        <DropdownItem divider tag="li" />
                                        <NavLink tag="li">
                                            <DropdownItem onClick={logout} className="nav-item">Log out</DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <li className="separator d-lg-none" />
                            </Nav>
                        </Collapse>
                        : <Nav>
                            <NavItem>
                            <InputGroup className="search-bar">
                                <FixedPlugin bgColor={color} sideColor={props.sideColor} handleBgClick={props.changeColor}/>
                            </InputGroup>
                            </NavItem>
                            <NavItem>
                                <NavLink active={pathPage === "login" ? true : false} onClick={()=>navigate("/auth/login")} >
                                    로그인
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={pathPage.includes("register") ? true : false} onClick={()=>navigate("/auth/register-choice")}>
                                    회원가입
                                </NavLink>
                            </NavItem>
                        </Nav>
                    }
                </Container>
            </Navbar>
            <Modal
                modalClassName="modal-search"
                isOpen={modalSearch}
                toggle={toggleModalSearch}
            >
                <ModalHeader>
                    <Input placeholder="SEARCH" onChange={(e) => searchForm(e.target.value)} type="text" />
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={toggleModalSearch}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </button>
                </ModalHeader>
            </Modal>
        </>
    );
}

export default CommonNavbar;