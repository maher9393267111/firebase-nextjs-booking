
import { Button, Checkbox, Form, Input } from 'antd';
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import Layout from '../components/global/Layout'
import { Select } from 'antd';
import React from 'react';

const { Option } = Select;
const Search = () => {

const [category,setCategory] = useState('cat')
const [location,setLocation] = useState('loc')
const [guests,setGuests] = useState('')


const router = useRouter()


const onFinish = (values) => {
    console.log('Success:', values);

router.push({ pathname: '/', query: { category: category, location: values.location, guests: guests } })


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setCategory(value)
    console.log(category)
  };


  const handleChangeguests = (value) => {
    console.log(`selected ${value}`);
    setGuests(value)
    console.log(guests)
  };





    return (
       <Layout>
{category}
{location}
{guests}

<div className='   translate-y-[50%] h-[60vh]        '>

<div className=' mx-auto min-h-[300px] shadow-xl w-[400px]'>


<Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: 'Please Enter room  location!',
          },
        ]}
      >
        <Input />
      </Form.Item>

{/* ----Category---- */}


<Select
    mode="category"
    style={{
      width: '70%',
      marginTop: '15px',
        marginBottom: '15px',
        marginLeft: '124px',
    }}
    placeholder="Tags Mode"
    onChange={handleChange}
  >
       {['king', 'single', 'double'].map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
  </Select>




  <Select
    mode="Guests"
    style={{
      width: '70%',
      marginTop: '15px',
        marginBottom: '15px',
        marginLeft: '124px',
    }}
    placeholder="Tags Mode"
    onChange={handleChangeguests}
  >
       {[1,2,3,4,5,6].map(guest => (
                                    <option key={guest} value={guest}>{guest}</option>
                                ))}
  </Select>







      <Form.Item
        wrapperCol={{
          offset: 4,
        // span: 18,
          
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>




</div>






</div>



       </Layout>
    );
}

export default Search;
