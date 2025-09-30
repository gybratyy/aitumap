import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from "@chakra-ui/react";

const ClassroomModal = ({ isOpen, onClose, classroom, schedule }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Schedule for {classroom}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {schedule && schedule.length > 0 ? (
                        Object.entries(
                            schedule
                                .slice()
                                .sort((a, b) => a.time.localeCompare(b.time))
                                .reduce((acc, item) => {
                                    const key = `${item.time}|${item.discipline}|${item.type}|${item.instructor}`;
                                    if (!acc[key]) {
                                        acc[key] = { ...item, groups: [item.group] };
                                    } else {
                                        acc[key].groups.push(item.group);
                                    }
                                    return acc;
                                }, {})
                        ).map(([_, item], index) => (
                            <Text key={index}>
                                {item.time}: {item.discipline} ({item.type}) - {item.instructor} - {item.groups.join(", ")}
                            </Text>
                        ))
                    ) : (
                        <Text>No classes today.</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ClassroomModal;