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
  } from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons';







const Navbar = () => {

    const {userinfo} = useAuth();


    return (
      
<div>

<div>
    <div className=' w-full h-[74px]   shadow-xl'>
        
{/* ---flex  image and auth itytem--- */}


<div className=' flex justify-between my-8'>

{/* -----left------ */}

<div>
    <img className=' w-24 h-24 rounded-full object-cover' src="https://thumbs.dreamstime.com/z/simple-illustration-dark-blue-hotel-logo-design-template-business-icon-inspiration-travel-tourism-sticker-idea-simple-165633303.jpg" alt="" />
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
    <MenuItem>
    
    <Link href={ `/profile/${userinfo?.name}`}>
        Profile
        </Link>
    
    </MenuItem>
    <MenuItem>
    <Link href={ `/booking/${userinfo?.name}`}>
        Booking
        </Link>
    </MenuItem>
    <MenuItem>Share</MenuItem>
  </MenuList>
</Menu>
</div>

</div>)

:
(
    <div>
<h1>login</h1>
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
