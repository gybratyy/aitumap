import { useContext, useState } from "react";
import { Sidebar, Search, FloorOption, ClassroomModal } from "../components";
import { MapContext } from "../shared";
import ShowIOS from "./ShowIOS";
import Show from "./Show";

const Home = ({ isIOS }) => {
    const { selectedBlockOption, selectedFloorOption, classRoomSchedules } = useContext(MapContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClassroom, setSelectedClassroom] = useState(null);

    const handleClassroomClick = (classroom) => {
        setSelectedClassroom(classroom);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedClassroom(null);
    };

    const dayOfWeek = new Date()
        .toLocaleString("en-US", { weekday: "long" })
        .toLowerCase();

    let schedule = [];
    if (selectedClassroom) {
        const lastChar = selectedClassroom.slice(-1).toUpperCase();
        if (lastChar === "P" || lastChar === "K") {
            const baseClassroom = selectedClassroom.slice(0, -1);
            const scheduleP = classRoomSchedules[baseClassroom + "P"]?.[dayOfWeek];
            const scheduleK = classRoomSchedules[baseClassroom + "K"]?.[dayOfWeek];
            schedule = scheduleP?.length ? scheduleP : (scheduleK?.length ? scheduleK : []);
        } else {
            schedule = classRoomSchedules[selectedClassroom]?.[dayOfWeek] || [];
        }
    }
    return (
        <>
            <FloorOption />
            <Search />
            <Sidebar />
            {isIOS ? (
                <ShowIOS
                    selectedFloorBlockOption={selectedFloorOption + selectedBlockOption}
                    onClassroomClick={handleClassroomClick}
                />
            ) : (
                <Show
                    selectedFloorBlockOption={selectedFloorOption + selectedBlockOption}
                    onClassroomClick={handleClassroomClick}
                />
            )}
            <ClassroomModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                classroom={selectedClassroom}
                schedule={schedule}
            />
        </>
    );
};

export default Home;