import React from "react";
import logo from "../assets/sidebar/logo.png";
import toggle from "../assets/sidebar/toggle.png";
import { PiArrowsLeftRightLight } from "react-icons/pi";
import { CiGlobe } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import listIcon1 from "../assets/sidebar/list-icon1.png";
import listIcon2 from "../assets/sidebar/list-icon2.png";
import listIcon3 from "../assets/sidebar/list-icon3.png";
import listIcon4 from "../assets/sidebar/list-icon4.png";
import dashboardLayout from "../assets/sidebar/layout-dashboard.png";
import openIcon from "../assets/sidebar/open.png";
import admin from "../assets/sidebar/admin.png";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import "../css/sidebar.css";
import "../css/dashboard.css";

function Sidebar({ hide, toggleSidebar }) {
  return (
    <div className="sidebar" style={{ width: hide ? "60px" : "270px" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={logo}
            alt=""
            width="22px"
            className={hide ? "ml-2 logo" : "mr-2 logo"}
            onClick={toggleSidebar}
          />

          <h4
            className={
              hide
                ? "font-bold text-xl hidden"
                : "font-bold text-xl mobile-width"
            }
            style={{ color: "#262626" }}
          >
            {" "}
            Front-Desk
          </h4>
        </div>
        <img
          src={toggle}
          alt=""
          width="18px"
          className={hide ? "hidden toggle" : "mobile-width toggle"}
          onClick={toggleSidebar}
        />
      </div>
      <div
        className="flex items-center justify-between mt-6 bg-white p-2 rounded"
        style={{ boxShadow: "0px 1px 1px 0px #64748B0D", zIndex: 2 }}
      >
        <p
          className={
            hide
              ? "text-sm font-medium hidden"
              : "text-sm font-medium mobile-width"
          }
        >
          Location Name
        </p>
        <PiArrowsLeftRightLight />
      </div>
      <div
        className="date"
        style={{
          padding: "5px 10px 10px 10px",
          backgroundColor: "#F1F5F9",
          boxShadow: "0px 1px 1px 0px #64748B0D",
          zIndex: 0,
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          className={
            hide
              ? "flex items-center rounded mb-1 hidden"
              : "flex items-center rounded mb-1 mobile-width"
          }
          style={{ boxShadow: "0px 1px 1px 0px #64748B0D" }}
        >
          <h4 className="font-semibold mr-2 text-md">08:30 AM</h4>
          <p className="font-medium ">Tue 20 Jan</p>
        </div>
        <div class="flex items-center justify-between">
          <div className="flex items-center">
            <CiGlobe className="mr-1" style={{ fontSize: "1rem" }} />
            <p
              className={
                hide
                  ? "text-xs font-medium hidden"
                  : "text-xs font-medium mobile-width"
              }
            >
              UTC: +5 hours
            </p>
          </div>
          <div>
            <GoChevronDown
              style={{ fontSize: "1.3rem" }}
              className={hide ? "hidden" : "mobile-width"}
            />
          </div>
        </div>
      </div>
      <ul className="sidebar-list mt-7">
        <li>
          <span>
            <img src={listIcon1} alt="" width="20px" />
          </span>
          <p className={hide ? "hidden" : "mobile-width"}>Orders</p>
        </li>
        <li>
          <span>
            <img src={listIcon2} alt="" width="20px" />
          </span>
          <p className={hide ? "hidden" : "mobile-width"}>Subscriptions</p>
        </li>
        <li>
          <span>
            <img src={listIcon3} alt="" width="20px" />
          </span>

          <p className={hide ? "hidden" : "mobile-width"}>Calendar</p>
        </li>
        <li className="active">
          <span>
            <img src={listIcon4} alt="" width="20px" />
          </span>

          <p className={hide ? "hidden" : "mobile-width"}>Waitlist</p>
        </li>
      </ul>
      <div className="below-section">
        <div className="flex items-center justify-between mb-8">
          <div
            className={
              hide
                ? "flex items-center hidden"
                : "flex items-center mobile-width"
            }
          >
            <img src={dashboardLayout} alt="" width="17px" />
            <p className="ml-2 text-sm font-medium">Dashboard</p>
          </div>
          <img
            src={openIcon}
            alt=""
            width="17px"
            className={hide ? "ml-3" : "dashboardImg"}
          />
        </div>
        <div
          className={
            hide
              ? "container flex items-center justify-between bg-white mb-4 admin-container"
              : "container flex items-center justify-between bg-white p-3 mb-4 admin-container"
          }
          style={{ width: "100%" }}
        >
          <div className="flex items-center">
            <img
              src={admin}
              alt="Admin's Profile"
              width={hide ? "40px" : "25px"}
              className={hide ? "p-2 bg-white rounded-sm adminImg" : "adminImg"}
              style={{ maxWidth: "900px" }}
            />
            <div
              className={hide ? "block ml-2 hidden" : "block ml-2 mobile-width"}
            >
              <p className="text-sm font-medium" style={{ color: "#0F172A" }}>
                Admin Name
              </p>
              <p className="text-xs font-light">adminname@mail.com</p>
            </div>
          </div>
          <GoChevronDown
            style={{ fontSize: "1.3rem" }}
            className={hide ? "hidden" : "mobile-width"}
          />
        </div>
        <div
          className={
            hide ? "help flex items-center ml-2" : "help flex items-center"
          }
        >
          <AiOutlineQuestionCircle
            className={hide ? "" : "mr-3 userImg"}
            style={{ fontSize: "1.1rem" }}
          />
          <div className={hide ? "block hidden" : "block mobile-width"}>
            <p className="text-sm font-normal">Help center</p>
            <p className="font-light text-xs mt-1">@2024 Omnify.Inc</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
