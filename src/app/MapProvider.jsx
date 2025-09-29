import { useEffect, useState } from "react";
import { MapContext, useWindowDimensions } from "../shared";
import classRoomSchedules from "../classroom_schedules.json"; // Import classroom schedules
import groupSchedules from "../group_schedules.json";

const MapProvider = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const [search, setSearch] = useState("");
  const [selectedFloorOption, setSelectedFloorOption] = useState("first");
  const [selectedBlockOption, setSelectedBlockOption] = useState("");
  const [isKeyboardTyping, setIsKeyboardTyping] = useState(false);
  const [funMode, setFunMode] = useState(false);

  const getClassroomStatus = (classroomName) => {
    const now = new Date();
    const dayOfWeek = now
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);

    const group = localStorage.getItem("group");
    const groupSchedule = groupSchedules[group];

    let isOccupied = false;
    let isYourClassToday = false;
    let isYourClassNow = false;

    const classroomSchedule = classRoomSchedules[classroomName];

    if (classroomSchedule && classroomSchedule[dayOfWeek]) {
      classroomSchedule[dayOfWeek].forEach((classInfo) => {
        const [startTime, endTime] = classInfo.time.split("-");
        if (currentTime >= startTime && currentTime <= endTime) {
          isOccupied = true;
        }
      });
    }

    if (groupSchedule && groupSchedule[dayOfWeek]) {
      groupSchedule[dayOfWeek].forEach((classInfo) => {
        if (classInfo.classroom === classroomName) {
          isYourClassToday = true;
          const [startTime, endTime] = classInfo.time.split("-");
          if (currentTime >= startTime && currentTime <= endTime) {
            isYourClassNow = true;
          }
        }
      });
    }

    if (isYourClassNow) {
      return "yourClassNow";
    } else if (isYourClassToday) {
      return "yourClassToday";
    } else if (isOccupied) {
      return "occupiedClassRoom";
    } else {
      return "freeClassRoom";
    }
  };



  const floorOptionData = [
    {
      id: 3,
      name: "third",
    },
    {
      id: 2,
      name: "second",
    },
    {
      id: 1,
      name: "first",
    },
  ];

  const handleFloorOptionChange = (option) => {
    setSearch("");
    setSelectedFloorOption(option);
  };

  const handleSearchInput = (e) => {
    const regex = /^[0-9cCpPlLkK.]+$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      setSearch(e.target.value);
    }
  };

  const handleFloorOptionClick = (e) => {
    let name = e.target.name;
    if (name !== selectedFloorOption) {
      setSelectedFloorOption(name);
      handleFloorOptionChange(name);
    }
  };

  const handleBlockOptionChange = (e) => {
    setSelectedBlockOption(e.target.value);
  };

  useEffect(() => {
    const handleKeyboardTyping = () => {
      const conditions = ["C", "."];
      if (conditions.some((i) => search.includes(i))) {
        setIsKeyboardTyping(true);
      } else if (isKeyboardTyping) {
        setIsKeyboardTyping(false);
      }
    };

    const handleFloor = () => {
      try {
        if (search.charAt(0) === "1" && selectedFloorOption !== "first") {
          setSelectedFloorOption("first");
        } else if (
          search.charAt(0) === "2" &&
          selectedFloorOption !== "second"
        ) {
          setSelectedFloorOption("second");
        } else if (
          search.charAt(0) === "3" &&
          selectedFloorOption !== "third"
        ) {
          setSelectedFloorOption("third");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const withoutKeyboardTyping = () => {
      handleFloor();
      let blockOptionValue =
        selectedBlockOption === "" ? "" : selectedBlockOption + ".";
      let activity = search
        ? blockOptionValue + search.toUpperCase()
        : search.toUpperCase();
      const groups = document.querySelectorAll(`[data-name*="${activity}"]`);

      if (groups.length > 0) {
        groups.forEach((group) => {
          group.classList.add("room-map-group-search-target");
        });
      }

      const groupsToRemove = document.querySelectorAll(
        `[data-name]:not([data-name*="${activity}"])`
      );

      if (groupsToRemove.length > 0) {
        groupsToRemove.forEach((group) => {
          group.classList.remove("room-map-group-search-target");
        });
      }
    };

    const withKeyboardTyping = (s) => {
      let searchSplitted = s.split(/,|\./);

      try {
        if (
          typeof searchSplitted[0] === "string" &&
          searchSplitted[0].length > 0 &&
          searchSplitted[0].includes("C") &&
          searchSplitted.length > 2
        ) {
          if (
            searchSplitted[1].charAt(0) === "1" &&
            selectedBlockOption !== "C1.1"
          ) {
            setSelectedBlockOption("C1.1");
          } else if (
            searchSplitted[1].charAt(0) === "2" &&
            selectedBlockOption !== "C1.2"
          ) {
            setSelectedBlockOption("C1.2");
          } else if (
            searchSplitted[1].charAt(0) === "3" &&
            selectedBlockOption !== "C1.3"
          ) {
            setSelectedBlockOption("C1.3");
          } else if (
            searchSplitted[2].charAt(0) === "1" &&
            selectedFloorOption !== "first"
          ) {
            setSelectedFloorOption("first");
          } else if (
            searchSplitted[2].charAt(0) === "2" &&
            selectedFloorOption !== "second"
          ) {
            setSelectedFloorOption("second");
          } else if (
            searchSplitted[2].charAt(0) === "3" &&
            selectedFloorOption !== "third"
          ) {
            setSelectedFloorOption("third");
          }
        } else if (
          typeof searchSplitted[0] === "string" &&
          searchSplitted[0].length > 0 &&
          !searchSplitted[0].includes("C") &&
          searchSplitted.length > 1
        ) {
          if (
            searchSplitted[0].charAt(0) === "1" &&
            selectedBlockOption !== "C1.1"
          ) {
            setSelectedBlockOption("C1.1");
          } else if (
            searchSplitted[0].charAt(0) === "2" &&
            selectedBlockOption !== "C1.2"
          ) {
            setSelectedBlockOption("C1.2");
          } else if (
            searchSplitted[0].charAt(0) === "3" &&
            selectedBlockOption !== "C1.3"
          ) {
            setSelectedBlockOption("C1.3");
          } else if (
            searchSplitted[1].charAt(0) === "1" &&
            selectedFloorOption !== "first"
          ) {
            setSelectedFloorOption("first");
          } else if (
            searchSplitted[1].charAt(0) === "2" &&
            selectedFloorOption !== "second"
          ) {
            setSelectedFloorOption("second");
          } else if (
            searchSplitted[1].charAt(0) === "3" &&
            selectedFloorOption !== "third"
          ) {
            setSelectedFloorOption("third");
          }
        }
      } catch (err) {
        console.log(err);
      }

      const groups = document.querySelectorAll(
        `[data-name*="${search.toUpperCase()}"]`
      );

      if (groups.length > 0) {
        groups.forEach((group) => {
          group.classList.add("room-map-group-search-target");
        });
      }

      const groupsToRemove = document.querySelectorAll(
        `[data-name]:not([data-name*="${search.toUpperCase()}"])`
      );

      if (groupsToRemove.length > 0) {
        groupsToRemove.forEach((group) => {
          group.classList.remove("room-map-group-search-target");
        });
      }
    };

    const handleSearch = () => {
      handleKeyboardTyping();

      if (isKeyboardTyping) withKeyboardTyping(search);
      else withoutKeyboardTyping();
    };

    handleSearch();
  }, [isKeyboardTyping, search, selectedBlockOption, selectedFloorOption]);

  return (
    <MapContext.Provider
      value={{
        isKeyboardTyping,
        selectedBlockOption,
        handleBlockOptionChange,
        search,
        handleSearchInput,
        selectedFloorOption,
        width,
        height,
        floorOptionData,
        handleFloorOptionClick,
        setFunMode,
        funMode,
        setIsKeyboardTyping,
        setSelectedBlockOption,
        setSelectedFloorOption,
        setSearch,
        classRoomSchedules,
        groupSchedules,
        getClassroomStatus,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
