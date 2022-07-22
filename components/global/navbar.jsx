import React from 'react';

import Link from 'next/link';
import {useAuth} from '../../context/index'
import {
    Menu,
    Button,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    WrapItem,
    ButtonGroup 
  } from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons';







const Navbar = () => {

    const {userinfo} = useAuth();


    return (
      
<div>

<div>
    <div className=' w-full h-[74px]   shadow-xl'>
        
{/* ---flex  image and auth itytem--- */}


<div className=' flex justify-between my-8 mx-12'>

{/* -----left------ */}

<div className=' relative -top-12'>
    <img className=' w-28 h-28 rounded-full border-2 border-black object-cover' src="https://us.123rf.com/450wm/sitiardi21/sitiardi211701/sitiardi21170100013/70276178-hotel-reflection-logo.jpg" alt="" />
</div>


{/* -----Right---- */}

<div>

{/* ---- if user is auth---- */}

{userinfo?.id ? (<div>

<div>
<Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    {userinfo.name}
  </MenuButton>
  <MenuList>
    <MenuItem
      fontWeight={'bold'}
    >
    
    <Link href={ `/profile/${userinfo?.name}`}>
        Profile
        </Link>
    
    </MenuItem>
    <MenuItem
    fontSize={'md'}
    fontWeight={'bold'}
    >
    <Link href={ `/booking/${userinfo?.name}`}>
        Booking
        </Link>
    </MenuItem>
    <MenuItem>
    
    <div>
    <WrapItem
      fontWeight={'bold'}
    >
      <Button colorScheme='red'>Logout</Button>
    </WrapItem>
   

    </div>
    
    </MenuItem>
  </MenuList>
</Menu>
</div>

</div>)

:
(
    <div>
<div>

<ButtonGroup gap='4'>
      <Button colorScheme='blue'>Register</Button>
      <Button colorScheme='blue'>Login</Button>
    </ButtonGroup>

</div>
    </div>
)


}




{/* ----if user not auth---- */}

</div>



</div>



    </div>
</div>


    
</div>


    );
}

export default Navbar;
