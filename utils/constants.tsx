import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiBookshelf,GiClothes, GiJewelCrown } from 'react-icons/gi';
import { FaLaptopMedical } from 'react-icons/fa';
import {RiPlantLine, RiFridgeLine} from 'react-icons/ri';
import {LuSofa, LuMicrowave} from 'react-icons/lu'
export const categories = [
  {
    title: 'cây cảnh',
    icon: <RiPlantLine />,
    name:'plant',
  },
  {
    title: 'nội thất',
    icon: <LuSofa />,
    name:'furniture',
  },
  {
    title: 'đồ gia dụng',
    icon: <RiFridgeLine />,
    name:'houseware',
  },
  {
    title: 'tài liệu',
    icon: <GiBookshelf />,
    name:'document',
  },
  {
    title: 'quần áo',
    icon: <GiClothes />,
    name:'clothes'
  },
  {
    title: 'điện tử',
    icon: <FaLaptopMedical />,
    name:'electronics'
  },
  {
    title: 'trang sức',
    icon: <GiJewelCrown/>,
    name:'jewelry'
  },
  // {
  //   title: 'bếp núc',
  //   icon: <LuMicrowave/>,
  // },
];

export const footerList1 = ['About','Contact']
export const footerList2 = [ 'Stories' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Community Guidelines' ]