import { C1_ALL_1, C1_ALL_2, C1_ALL_3 } from "../shared/ui/ios";
import {
  C1_1_1,
  C1_2_1,
  C1_3_1,
  C1_1_2,
  C1_2_2,
  C1_3_2,
  C1_1_3,
  C1_2_3,
  C1_3_3,
} from "../shared/ui/separate";

const ShowIOS = ({ selectedFloorBlockOption, onClassroomClick }) => {
  switch (selectedFloorBlockOption) {
    case "firstC1.1":
      return <C1_1_1 onClassroomClick={onClassroomClick} />;
    case "secondC1.1":
      return <C1_1_2 onClassroomClick={onClassroomClick} />;
    case "thirdC1.1":
      return <C1_1_3 onClassroomClick={onClassroomClick} />;

    case "firstC1.2":
      return <C1_2_1 onClassroomClick={onClassroomClick} />;
    case "secondC1.2":
      return <C1_2_2 onClassroomClick={onClassroomClick} />;
    case "thirdC1.2":
      return <C1_2_3 onClassroomClick={onClassroomClick} />;

    case "firstC1.3":
      return <C1_3_1 onClassroomClick={onClassroomClick} />;
    case "secondC1.3":
      return <C1_3_2 onClassroomClick={onClassroomClick} />;
    case "thirdC1.3":
      return <C1_3_3 onClassroomClick={onClassroomClick} />;

    case "first":
      return <C1_ALL_1 onClassroomClick={onClassroomClick} />;
    case "second":
      return <C1_ALL_2 onClassroomClick={onClassroomClick} />;
    case "third":
      return <C1_ALL_3 onClassroomClick={onClassroomClick} />;
    default:
      return <C1_ALL_1 onClassroomClick={onClassroomClick} />;
  }
};

export default ShowIOS;
