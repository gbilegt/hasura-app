import { useState, useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Stack,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Text,
    Input,
    RangeSliderMark,
    Box,
    Select,
  } from '@chakra-ui/react';
import axios from "axios";
import { BsHouseFill, BsSearch } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import Layouts from "../../components/Layouts"
import { forEach } from "lodash";


const headers = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": "jEqkXE8ewz2xwWhPnXFoNvMDjfugFkKZHw2XE1tAg20v7LwloNqVozW7Wei2zAAv" + "",
}

interface ICustomSelectProps {
    cities: {
        name: string;
        id: any;
    }[],
    onChange:(newValue: any) => void;
}

export default function Home(session:any, props: ICustomSelectProps) {

    var cityData: {[name: string]: any} = [];

    const getData = () => {
        var data = {  };
        axios.post("https://valid-dove-81.hasura.app/api/rest/city", data, {
            headers: headers
          })
          .then((result) => {
            console.log(result.data?.city);
            cityData = result.data?.city;
            console.log("log here ----------> " + cityData[0].name);
            // cityData.forEach(function (value) {
            //     console.log(value.name);
            // });
          })
          .catch((error) => {
            console.log(error);
          });
      };

    useEffect(() => {
        getData();
      }, []);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getDisclosureProps, getButtonProps } = useDisclosure()
    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()
    const [sliderValue, setSliderValue] = useState([350, 550])

    return (
        <div>
        <Layouts>
            <Stack direction="row" spacing={4}>
                <Button colorScheme="teal" leftIcon={<BsHouseFill/>} onClick={onOpen}>
                    New Item
                </Button>
                <Button colorScheme="blue" leftIcon={<FiFilter />} {...buttonProps}>Filter</Button>
            </Stack>
            <Stack {...disclosureProps} marginTop="1rem" direction={{ base: "column", md: "row" }} gap="1rem" alignItems="stretch" > 
                
                {/* <Select placeholder='Select Suburb'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select> */}
                <Input type="number" placeholder="Room..." />
                <Input type="number" placeholder="Bath..." />
                <Input type="number" placeholder="Garage..." />
            </Stack>
            <Stack {...disclosureProps} marginTop="1rem" direction={{ base: "column", md: "row" }} gap="2rem" alignItems="stretch">
            <Text>Price</Text>
                <Box w="80%">
                <RangeSlider marginTop="30px" defaultValue={[350, 550]} min={0} max={1500} step={50} aria-label={['min', 'max']} onChangeEnd={(val) => setSliderValue(val)}>
                <RangeSliderMark value={300} mt='1' ml='-2.5' fontSize='sm'>
                    300$
                </RangeSliderMark>
                <RangeSliderMark value={700} mt='1' ml='-2.5' fontSize='sm'>
                    700$
                </RangeSliderMark>
                <RangeSliderMark value={1100} mt='1' ml='-2.5' fontSize='sm'>
                    1100$
                </RangeSliderMark>
                <RangeSliderMark
                    value={sliderValue[0]}
                    textAlign='center'
                    bg='#90cdf4'
                    color='black'
                    mt='-10'
                    ml='-5'
                    w='12'
                >
                    {sliderValue[0]}$
                </RangeSliderMark>
                <RangeSliderMark
                    value={sliderValue[1]}
                    textAlign='center'
                    bg='#90cdf4'
                    color='black'
                    mt='-10'
                    ml='-5'
                    w='12'
                >
                    {sliderValue[1]}$
                </RangeSliderMark>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
                </RangeSlider>
                </Box>
                <Button colorScheme="teal" leftIcon={<BsSearch />}>Search</Button>
            </Stack>
            <TableContainer marginTop="40px">
            <Table variant='simple'>
                <TableCaption>Are you looking for your own home?</TableCaption>
                <Thead>
                <Tr>
                    <Th>Type</Th>
                    <Th>City</Th>
                    <Th>Suburb</Th>
                    <Th isNumeric>Price /$ per week/</Th>
                    <Th isNumeric>Room number</Th>
                    <Th isNumeric>Bath number</Th>
                    <Th isNumeric>Garage</Th>
                    <Th>Pool</Th>
                    <Th>Duration</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>Apartment</Td>
                    <Td>Sydney</Td>
                    <Td>Mascot</Td>
                    <Td isNumeric>450</Td>
                    <Td isNumeric>1</Td>
                    <Td isNumeric>1</Td>
                    <Td isNumeric>1</Td>
                    <Td>No</Td>
                    <Td>1 year</Td>
                </Tr>
                <Tr>
                    <Td>House</Td>
                    <Td>Brisbane</Td>
                    <Td>Indooroopilly</Td>
                    <Td isNumeric>550</Td>
                    <Td isNumeric>2</Td>
                    <Td isNumeric>1</Td>
                    <Td isNumeric>1</Td>
                    <Td>Yes</Td>
                    <Td>6 months</Td>
                </Tr>
                <Tr>
                    <Td>Apartment</Td>
                    <Td>Brisbane</Td>
                    <Td>Spring hill</Td>
                    <Td isNumeric>450</Td>
                    <Td isNumeric>1</Td>
                    <Td isNumeric>1</Td>
                    <Td isNumeric>0</Td>
                    <Td>No</Td>
                    <Td>6 months</Td>
                </Tr>
                </Tbody>
            </Table>
            </TableContainer>
        </Layouts>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                <ModalBody>
                    This is body
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </div>
    )
  }