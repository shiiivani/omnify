import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../css/dashboard.css";
import edit from "../assets/dashboard/edit.png";
import { FiCalendar, FiDownload, FiFilter, FiSearch } from "react-icons/fi";
import { LuRefreshCw, LuUser } from "react-icons/lu";
import { TbCircleDot } from "react-icons/tb";
import { RiHashtag } from "react-icons/ri";
import { HiChevronUpDown } from "react-icons/hi2";
import { GoChevronDown, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import dashboardLayout from "../assets/sidebar/layout-dashboard.png";
import { namesWithTags, serviceTypes } from "../data/Data";

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [editContainer, setEditContainer] = useState(false);
  const [filterContainer, setFilterContainer] = useState(false);
  const [hide, setHide] = useState(false);
  const initialColumnsState = {
    orderCreatedOn: true,
    payer: true,
    status: true,
    email: true,
    payerPhone: true,
    service: true,
    scheduled: true,
  };

  const [checkedItems, setCheckedItems] = useState(initialColumnsState);
  const [visibleColumns, setVisibleColumns] = useState(initialColumnsState);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedServiceType, setSelectedServiceType] = useState(
    "Show all service type"
  );
  const [selectedStatus, setSelectedStatus] = useState("Show all");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("Scheduled");
  const [selectedRadio, setSelectedRadio] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchService, setSearchService] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [selectedNames, setSelectedNames] = useState({});
  const [selectedService, setSelectedService] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleServiceType = () => setServiceTypeOpen(!serviceTypeOpen);
  const toggleStatus = () => setStatusOpen(!statusOpen);

  const handleOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleServiceType = (option) => {
    setSelectedServiceType(option);
    setServiceTypeOpen(false);
  };

  const handleStatus = (option) => {
    setSelectedStatus(option);
    setStatusOpen(false);
  };

  const toggleCheck = (item) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const toggleSidebar = () => {
    setHide(!hide);
  };

  const applyChanges = () => {
    setVisibleColumns(checkedItems);
  };

  const tableReset = () => {
    setCheckedItems(initialColumnsState);
    setVisibleColumns(initialColumnsState);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      const filteredResults = namesWithTags.filter((item) =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredData(filteredResults);
    }
  };

  const handleSelectingName = (name) => {
    setSelectedNames((prevSelectedNames) => ({
      ...prevSelectedNames,
      [name]: !prevSelectedNames[name], // Toggle the selected state for the clicked name
    }));
  };

  const handleServiceChange = (e) => {
    const searchService = e.target.value;
    setSearchService(searchService);

    if (searchService === "") {
      setFilteredServices([]);
    } else {
      const filteredResults = serviceTypes.filter((item) =>
        item.name.toLowerCase().startsWith(searchService.toLowerCase())
      );
      setFilteredServices(filteredResults);
    }
  };

  const handleSelectingService = (name) => {
    setSelectedService((prevSelectedService) => ({
      ...prevSelectedService,
      [name]: !prevSelectedService[name],
    }));
  };

  const handleSelectingRow = (row) => {
    setSelectedRow((prevSelectedRow) => ({
      ...prevSelectedRow,
      [row]: !prevSelectedRow[row],
    }));
  };

  const handleToggleAllRows = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRow = {};
    if (newSelectAll) {
      tableData.forEach((row) => {
        newSelectedRow[row.date] = true;
      });
    }
    setSelectedRow(newSelectedRow);
  };

  const generateRandomData = (numRows) => {
    const names = [
      "Theodore T.C. Calvin",
      "Hannibal Smith",
      "April Curtis",
      "Michael Knight",
      "Templeton Peck",
      "Peter Thornton",
      "Lynn Tanner",
      "Col. Roderick Decker",
      "Mike Torello",
    ];
    const statuses = [
      { color: "blue", label: "Lead" },
      { color: "green", label: "Active" },
      { color: "black", label: "Inactive" },
    ];
    const emails = [
      "theodore@gmail.com",
      "hannibalsmith@gmail.com",
      "aprilcurtis@gmail.com",
      "smith@gmail.com",
      "templeto@gmail.com",
      "peterthornton@gmail.com",
      "Lynn@gmail.com",
      "decker@gmail.com",
      "mikete@gmail.com",
    ];
    const phones = [
      "+91 +966559186876",
      "+91 +966578632254",
      "+91 +966558441503",
      "+91 +966536605363",
      "+91 +966503534287",
      "+91 +966530269650",
      "+91 +966566182220",
      "+91 +966544628109",
      "+91 +966594805058",
    ];
    const services = [
      "Private Language Session",
      "Swim beginner for class new Sess...",
      "Fitness Session",
      "Arobics Session",
      "Boxing Session",
      "Kids play Session",
      "Appointment Session",
      "Exercise Session",
      "Session Session",
    ];

    const getRandomElement = (arr) =>
      arr[Math.floor(Math.random() * arr.length)];
    // Generate dates in sequence
    const generateDates = (numDates) => {
      const dates = [];
      const startDate = new Date("2024-01-07T14:42:00"); // Start date: Jan 1, 2024, 2:42 PM
      for (let i = 0; i < numDates; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() - i); // Generate dates in descending order
        dates.push(
          date.toLocaleString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      }
      return dates;
    };

    const dates = generateDates(numRows);

    const data = dates.map((date) => ({
      date,
      payer: getRandomElement(names),
      status: getRandomElement(statuses),
      email: getRandomElement(emails),
      phone: getRandomElement(phones),
      service: getRandomElement(services),
      scheduled: date,
    }));

    return data;
  };

  useEffect(() => {
    const data = generateRandomData(45);
    setTableData(data);
  }, []);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="dashboard">
      <Sidebar className="sidebar" hide={hide} toggleSidebar={toggleSidebar} />
      <div
        className={
          hide
            ? "dashboard-container-full p-4 rounded"
            : "dashboard-container p-4 rounded"
        }
      >
        <h4 className="font-semibold text-xl">Waitlist</h4>
        <div className="flex items-center justify-center my-5 category-container">
          <div className="category active flex items-flex-start">
            <p>Waitlist</p>
            <p className="number">100</p>
          </div>
          <div className="category flex items-flex-start">
            <p>Newly Added</p>
            <p className="number">50</p>
          </div>
          <div className="category flex items-flex-start">
            <p>Leads</p>
            <p className="number">20</p>
          </div>
        </div>
        <div className="flex items-center justify-between filter-search">
          <div
            className="filter flex p-3 rounded"
            onClick={() => setFilterContainer(!filterContainer)}
          >
            <FiFilter style={{ fontSize: "1.2rem", marginRight: "5px" }} />
            <p className="text-sm font-medium">Add Filter</p>
          </div>
          <div className="flex items-center search">
            <div
              className="search-container flex item-center position-relative mr-5"
              style={{ width: "250px" }}
            >
              <FiSearch className="searchIcon" />
              <input
                type="text"
                name="search"
                placeholder="Search client"
                className="p-2 pl-7 rounded shadow-sm text-sm font-normal"
                style={{ width: "100%" }}
              />
            </div>
            <LuRefreshCw
              className="mr-4 icon-btn"
              style={{ fontSize: "1.6rem" }}
            />
            <img
              src={edit}
              alt="Icon"
              width="28px"
              className="mr-4 icon-btn"
              onClick={() => setEditContainer(!editContainer)}
            />
            <FiDownload className="icon-btn" style={{ fontSize: "1.6rem" }} />
          </div>
        </div>
        <div className="table-container">
          <div
            className={
              filterContainer ? "filter-container active" : "filter-container"
            }
          >
            <div className="flex items-flex-start justify-center inner-container">
              <div className="left-section sections">
                <ul>
                  <li
                    className={filterCategory === "Scheduled" ? "active" : ""}
                    onClick={() => setFilterCategory("Scheduled")}
                  >
                    <FiCalendar style={{ fontSize: "1rem" }} />
                    <p>Scheduled Date</p>
                  </li>
                  <li
                    className={filterCategory === "People" ? "active" : ""}
                    onClick={() => setFilterCategory("People")}
                  >
                    <LuUser style={{ fontSize: "1.1rem" }} />
                    <p>People</p>
                  </li>
                  <li
                    className={filterCategory === "Services" ? "active" : ""}
                    onClick={() => setFilterCategory("Services")}
                  >
                    <img src={dashboardLayout} alt="icon" width="18px" />
                    <p>Services/Products</p>
                  </li>
                </ul>
              </div>
              <div className="right-section sections">
                {filterCategory === "Scheduled" && (
                  <>
                    <p className="label">Show orders for</p>
                    <div className="dropdown-container relative">
                      <div className={isOpen ? "active" : ""}>
                        <button
                          className={
                            isOpen
                              ? "dropdown flex items-center justify-between"
                              : "dropdown flex items-center justify-between"
                          }
                          onClick={toggleDropdown}
                        >
                          {selectedOption}
                          <span>
                            <GoChevronDown style={{ fontSize: "1.1rem" }} />
                          </span>
                        </button>
                      </div>
                      {isOpen && (
                        <ul>
                          <li onClick={() => handleOption("All")}>All</li>
                          <li onClick={() => handleOption("Custom")}>Custom</li>
                          <li onClick={() => handleOption("Last 30 days")}>
                            Last 30 days
                          </li>
                          <li onClick={() => handleOption("Last month")}>
                            Last month
                          </li>
                          <li onClick={() => handleOption("This quarter")}>
                            This quarter
                          </li>
                          <li onClick={() => handleOption("2 quarter ago")}>
                            2 quarter ago
                          </li>
                          <li onClick={() => handleOption("This year")}>
                            This year
                          </li>
                          <li onClick={() => handleOption("Last year")}>
                            Last year
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="date-from">
                        <p className="label">From</p>
                        <div className="custom-date-input">
                          <FiCalendar className="calendar-icon" />
                          <input
                            type="date"
                            id="from-date"
                            name="from-date"
                            value={selectedFromDate}
                            onChange={(event) =>
                              setSelectedFromDate(event.target.value)
                            }
                            style={{
                              color: selectedFromDate ? "#000" : "#fff",
                            }}
                            className={selectedFromDate ? "date-selected" : ""}
                          />
                          {!selectedFromDate && (
                            <span className="date-placeholder">
                              Pick a date
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="date-to">
                        <p className="label">To</p>
                        <div className="custom-date-input">
                          <FiCalendar className="calendar-icon" />
                          <input
                            type="date"
                            id="from-date"
                            name="from-date"
                            placeholder="Pick a date"
                            value={selectedToDate}
                            onChange={(event) =>
                              setSelectedToDate(event.target.value)
                            }
                            style={{
                              color: selectedToDate ? "#000" : "#fff",
                            }}
                            className={selectedToDate ? "date-selected" : ""}
                          />
                          {!selectedToDate && (
                            <span className="date-placeholder">
                              Pick a date
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {filterCategory === "People" && (
                  <>
                    <div className="flex items-center input-container">
                      <FiSearch className="searchIcon" />
                      <input
                        type="text"
                        placeholder="Search payer or attendee name"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      {filteredData.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "5px 0",
                          }}
                          className="flex items-center"
                        >
                          <div
                            className={
                              selectedNames[item.name]
                                ? "checkbox checked flex items-center justify-center p-0"
                                : "checkbox flex items-center justify-center p-0"
                            }
                            style={{
                              width: "15px",
                              height: "15px",
                              boxShadow: "none",
                            }}
                            onClick={() => handleSelectingName(item.name)}
                          ></div>
                          <p className="font-normal text-sm mb-2 ml-2">
                            {item.name}
                            <span
                              className="p-1 rounded text-xs ml-3"
                              style={{ backgroundColor: "#F8FAFC" }}
                            >
                              {item.tag}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {filterCategory === "Services" && (
                  <>
                    <div className="flex items-center justify-between services">
                      <div
                        className="flex items-center justify-start radio"
                        onClick={() => setSelectedRadio(1)}
                      >
                        <div className="radio-btn">
                          {selectedRadio === 1 && (
                            <div className="radio-btn-selected"></div>
                          )}
                        </div>
                        <p>Search by name</p>
                      </div>
                      <div
                        className="flex items-center justify-start radio"
                        onClick={() => setSelectedRadio(2)}
                      >
                        <div className="radio-btn">
                          {selectedRadio === 2 && (
                            <div className="radio-btn-selected"></div>
                          )}
                        </div>
                        <p>Search by tags</p>
                      </div>
                    </div>
                    {selectedRadio === 1 && (
                      <>
                        {" "}
                        <div className="flex items-center input-container mt-5">
                          <FiSearch className="searchIcon" />
                          <input
                            type="text"
                            placeholder="Search service name"
                            value={searchService}
                            onChange={handleServiceChange}
                          />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          {filteredServices.map((item, index) => (
                            <div
                              key={index}
                              style={{
                                padding: "5px 0",
                              }}
                              className="flex items-center"
                            >
                              <div
                                className={
                                  selectedService[item.name]
                                    ? "checkbox checked flex items-center justify-center p-0"
                                    : "checkbox flex items-center justify-center p-0"
                                }
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  boxShadow: "none",
                                }}
                                onClick={() =>
                                  handleSelectingService(item.name)
                                }
                              ></div>
                              <div
                                className="flex items-center justify-between"
                                style={{ width: "100%" }}
                              >
                                <p className="font-normal text-sm mb-2 ml-2">
                                  {item.name}
                                </p>
                                <div className="flex items-center justify-end">
                                  <p
                                    className="p-1 rounded text-xs mr-3"
                                    style={{ backgroundColor: "#F8FAFC" }}
                                  >
                                    {item.type}
                                  </p>
                                  <p
                                    className="p-1 rounded text-xs"
                                    style={{
                                      backgroundColor: "#F8FAFC",
                                      color:
                                        item.status === "Public"
                                          ? "#039855"
                                          : "#BF8000",
                                    }}
                                  >
                                    {item.status}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {selectedRadio === 2 && (
                      <>
                        <p className="label mt-5">Service type</p>
                        <div className="dropdown-container relative">
                          <div className={serviceTypeOpen ? "active" : ""}>
                            <button
                              className={
                                serviceTypeOpen
                                  ? "dropdown flex items-center justify-between"
                                  : "dropdown flex items-center justify-between"
                              }
                              onClick={toggleServiceType}
                            >
                              {selectedServiceType}
                              <span>
                                <GoChevronDown style={{ fontSize: "1.1rem" }} />
                              </span>
                            </button>
                          </div>
                          {serviceTypeOpen && (
                            <ul style={{ height: "200px" }}>
                              <li
                                onClick={() =>
                                  handleServiceType("Show all service type")
                                }
                              >
                                Show all service type
                              </li>
                              <li onClick={() => handleServiceType("Class")}>
                                Class
                              </li>
                              <li
                                onClick={() => handleServiceType("Appoinment")}
                              >
                                Appointment
                              </li>
                              <li onClick={() => handleServiceType("Facility")}>
                                Facility
                              </li>
                              <li
                                onClick={() => handleServiceType("Class pack")}
                              >
                                Class Pack
                              </li>
                              <li
                                onClick={() => handleServiceType("Membership")}
                              >
                                Membership
                              </li>
                              <li
                                onClick={() =>
                                  handleServiceType("General items")
                                }
                              >
                                General items
                              </li>
                            </ul>
                          )}
                        </div>

                        <p className="label mt-5">Status</p>
                        <div className="dropdown-container relative">
                          <div className={statusOpen ? "active" : ""}>
                            <button
                              className={
                                statusOpen
                                  ? "dropdown flex items-center justify-between"
                                  : "dropdown flex items-center justify-between"
                              }
                              onClick={toggleStatus}
                            >
                              {selectedStatus}
                              <span>
                                <GoChevronDown style={{ fontSize: "1.1rem" }} />
                              </span>
                            </button>
                          </div>
                          {statusOpen && (
                            <ul style={{ height: "120px" }}>
                              <li onClick={() => handleStatus("Show all")}>
                                Show all
                              </li>
                              <li onClick={() => handleStatus("Public")}>
                                Public
                              </li>
                              <li onClick={() => handleStatus("Private")}>
                                Private
                              </li>
                              <li onClick={() => handleStatus("Facility")}>
                                Facility
                              </li>
                              <li onClick={() => handleStatus("Disable")}>
                                Disable
                              </li>
                              <li onClick={() => handleStatus("Draft")}>
                                Draft
                              </li>
                            </ul>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="btn-container flex items-center justify-end p-3">
              <button style={{ backgroundColor: "#F4F4F5" }}>
                Reset to Default
              </button>
              <button style={{ backgroundColor: "#000", color: "#fff" }}>
                Apply
              </button>
            </div>
          </div>
          <div
            className={
              editContainer ? "edit-container active" : "edit-container"
            }
          >
            <h6 className="font-medium text-lg" style={{ color: "#000" }}>
              Edit Columns
            </h6>
            <p className="font-normal mt-1">Select the columns to rearrange</p>
            <ul className="columns mt-2">
              <li onClick={() => toggleCheck("orderCreatedOn")}>
                <div
                  className={
                    checkedItems.orderCreatedOn
                      ? "checkbox checked flex items-center justify-center"
                      : "checkbox flex items-center justify-center"
                  }
                >
                  <FaCheck className="icon" />
                </div>
                <p>Order Created On</p>
              </li>
              <li onClick={() => toggleCheck("payer")}>
                <div
                  className={
                    checkedItems.payer
                      ? "checkbox checked flex items-center justify-center"
                      : "checkbox flex items-center justify-center"
                  }
                >
                  <FaCheck className="icon" />
                </div>
                <p>Payer</p>
              </li>
              <li onClick={() => toggleCheck("status")}>
                <div
                  className={
                    checkedItems.status
                      ? "checkbox checked flex items-center justify-center"
                      : "checkbox flex items-center justify-center"
                  }
                >
                  <FaCheck className="icon" />
                </div>
                <p>Status</p>
              </li>
              <li onClick={() => toggleCheck("email")}>
                <div
                  className={
                    checkedItems.email
                      ? "checkbox checked flex items-center justify-center"
                      : "checkbox flex items-center justify-center"
                  }
                >
                  <FaCheck className="icon" />
                </div>
                <p>Email</p>
              </li>
              <li onClick={() => toggleCheck("payerPhone")}>
                <div
                  className={
                    checkedItems.payerPhone
                      ? "checkbox checked flex items-center justify-center"
                      : "checkbox flex items-center justify-center"
                  }
                >
                  <FaCheck className="icon" />
                </div>
                <p>Payer Phone</p>
              </li>
              <li onClick={() => toggleCheck("service")}>
                <div
                  className={
                    checkedItems.service
                      ? "checkbox checked flex items-center justify-center"
                      : "checkbox flex items-center justify-center"
                  }
                >
                  <FaCheck className="icon" />
                </div>
                <p>Service</p>
              </li>
              <li onClick={() => toggleCheck("scheduled")}>
                <div
                  className={
                    checkedItems.scheduled
                      ? "checkbox checked flex items-center justify-center"
                      : "checkbox flex items-center justify-center"
                  }
                >
                  <FaCheck className="icon" />
                </div>
                <p>Scheduled</p>
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <button
                style={{ border: "1px solid #E2E8F0" }}
                onClick={tableReset}
              >
                Reset to default
              </button>
              <button
                style={{ backgroundColor: "#0F172A", color: "#fff" }}
                onClick={applyChanges}
              >
                Apply
              </button>
            </div>
          </div>
          <table className="mb-3">
            <thead>
              <tr>
                <th className={!visibleColumns.orderCreatedOn ? "hidden" : ""}>
                  <div className="flex items-center">
                    <div
                      className={
                        selectAll
                          ? "checkbox checked flex items-center justify-center"
                          : "checkbox flex items-center justify-center"
                      }
                      style={{ marginTop: "10px", marginRight: "10px" }}
                      onClick={handleToggleAllRows}
                    >
                      <FaCheck className="icon" />
                    </div>{" "}
                    <FiCalendar className="icon" />
                    <p>Created On</p>
                  </div>
                </th>
                <th className={!visibleColumns.payer ? "hidden" : ""}>
                  <div className="flex items-center">
                    <LuUser className="icon" />
                    <p>Payer</p>
                  </div>
                </th>
                <th className={!visibleColumns.status ? "hidden" : ""}>
                  <div className="flex items-center">
                    <TbCircleDot className="icon" />
                    <p>Status</p>
                  </div>
                </th>
                <th className={!visibleColumns.email ? "hidden" : ""}>
                  <div className="flex items-center">
                    <RiHashtag className="icon" style={{ fill: "#64748B" }} />
                    <p>Email</p>
                  </div>
                </th>
                <th className={!visibleColumns.payerPhone ? "hidden" : ""}>
                  <div className="flex items-center">
                    <RiHashtag className="icon" style={{ fill: "#64748B" }} />
                    <p>Payer Phone</p>
                  </div>
                </th>
                <th className={!visibleColumns.service ? "hidden" : ""}>
                  <div className="flex items-center">
                    <RiHashtag className="icon" style={{ fill: "#64748B" }} />

                    <p>Services</p>
                  </div>
                </th>
                <th className={!visibleColumns.scheduled ? "hidden" : ""}>
                  <div className="flex items-center">
                    <FiCalendar className="icon" />
                    <p>Scheduled</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index}>
                  <td
                    className={
                      !visibleColumns.orderCreatedOn
                        ? "date flex hidden"
                        : "date flex"
                    }
                  >
                    <div
                      className={
                        selectedRow[row.date]
                          ? "checkbox checked flex items-center justify-center"
                          : "checkbox flex items-center justify-center"
                      }
                      onClick={() => handleSelectingRow(row.date)}
                    >
                      <FaCheck className="icon" />
                    </div>
                    <p>{row.date}</p>
                  </td>
                  <td
                    className={!visibleColumns.payer ? "payer hidden" : "payer"}
                  >
                    {row.payer}
                  </td>
                  <td
                    className={
                      !visibleColumns.status ? "status hidden" : "status"
                    }
                  >
                    <div className={`flex items-center ${row.status.color}`}>
                      <div className={`${row.status.color} dot`}></div>
                      <p>{row.status.label}</p>
                    </div>
                  </td>
                  <td
                    className={!visibleColumns.email ? "email hidden" : "email"}
                  >
                    {row.email}
                  </td>
                  <td
                    className={
                      !visibleColumns.payerPhone ? "phone hidden" : "phone"
                    }
                  >
                    {row.phone}
                  </td>
                  <td
                    className={
                      !visibleColumns.service ? "service hidden" : "service"
                    }
                  >
                    {row.service}
                  </td>
                  <td
                    className={
                      !visibleColumns.scheduled
                        ? "date flex items-center hidden"
                        : "date flex items-center"
                    }
                  >
                    <p>{row.scheduled}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container flex items-center justify-between mt-6">
          <div className="flex items-center page-numbers">
            <p
              className="text-sm font-normal mr-1"
              style={{ color: "#64748B" }}
            >
              Displaying
            </p>
            <div
              className="flex items-center px-2 py-1 rounded mr-1"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              <p className="mr-1 text-sm" style={{ color: "#334155" }}>
                15
              </p>
              <HiChevronUpDown
                style={{ fontSize: "1.2rem", stroke: "#334155" }}
              />
            </div>
            <p className="text-sm " style={{ color: "#64748B" }}>
              out of <span className="text-black">45</span>
            </p>
          </div>
          <div className="flex items-center pagination">
            <GoChevronLeft
              className="mr-1 btn"
              style={{ fontSize: "1.1rem" }}
              onClick={prevPage}
            />
            <p onClick={prevPage}>Previous</p>
            <p
              className={currentPage === 1 ? "active" : ""}
              onClick={() => setCurrentPage(1)}
            >
              1
            </p>
            <p
              className={currentPage === 2 ? "active" : ""}
              onClick={() => setCurrentPage(2)}
            >
              2
            </p>
            <p
              className={currentPage === 3 ? "active" : ""}
              onClick={() => setCurrentPage(3)}
            >
              3
            </p>
            <p onClick={nextPage}>Next</p>
            <GoChevronRight
              className="btn"
              style={{ fontSize: "1.1rem" }}
              onClick={nextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
