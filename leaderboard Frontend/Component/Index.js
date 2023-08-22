import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import axios from "axios"



const Index = () => {
    const [weeklyData,setWeeklyData] = useState()
    const [monthlyData,setMonthlyData] = useState()

    const [lenthMatch, setLenghtMatch ] = useState(10)

    async function weeklyDataFunction(){
        try{
        const res = await axios.post("/api/weeklyData")
        const response = res.data.data.data
        console.log(response,"to get the respoonse")
       setWeeklyData(response)

    }catch(err){
        console.log(err)
    }
}


async function monthlyDataFunction(){
  try{
  const res = await axios.post("/api/monthlyData")
  const response = res.data.data.data
  console.log(response,"to get the respoonse")
 setMonthlyData(response)

}catch(err){
  console.log(err)
}
}


    useEffect(()=>{
      monthlyDataFunction()
        weeklyDataFunction()
    },[])

  return (
    <div>
          <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main 
      className="tableMain"
      >
        <div  className='container'>
        
<div className="leaderboard ">
  <h1>
    <svg className="ico-cup">
      {/* <use xlink:href="#cup"></use> */}
    </svg>
    Top 7 Affiliates For This Week
  </h1>

<div className='table tableHeader'>

<table className='table weekly-table'>
    <thead>
        <tr className='thead-tr'>
            <th scope='col' >Address</th>
            <th scope='col'>Rank</th>
            <th scope='col'>Refer</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Bonus</th>
                     </tr>
    </thead>

        <tbody> 


            {weeklyData?.map((item,i)=>{
              if(i>6) return;
                return(
                    <tr className='table-tr'>
                    <td> {item?.address}</td>
                    <td> {item?.rank}</td>
                    <td> {item?.refer}</td>
                    <td> {item?.amount}</td>
                    <td> {item?.bonus}</td>
    
                </tr>
                )
            })}

        </tbody>

</table>
    
</div>


</div>


<div className="leaderboard mb-5">
  <h1>
    <svg className="ico-cup">
      {/* <use xlink:href="#cup"></use> */}
    </svg>
    Top 7 Affiliates For This Month
  </h1>

<div className='table tableHeader'>

<table className='table weekly-table'>
    <thead>
        <tr className='thead-tr'>
            <th scope='col' >Address</th>
            <th scope='col'>Rank</th>
            <th scope='col'>Refer</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Bonus</th>
                     </tr>
    </thead>

        <tbody> 
            {monthlyData?.map((item,i)=>{
              if(i>6) return;
                return(
                    <tr className='table-tr'>
                    <td> {item?.address}</td>
                    <td> {item?.rank}</td>
                    <td> {item?.refer}</td>
                    <td> {item?.amount}</td>
                    <td> {item?.bonus}</td>
    
                </tr>
                )
            })}

        </tbody>

</table>
    
</div>


</div>
</div>
 </main>
    </>
    </div>

  )
}

export default Index