'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Navigation from '@/components/Navigation';

import {
  FaRocket,
  FaPuzzlePiece,
  FaCreditCard,
  FaExternalLinkAlt,
  FaDesktop,
  FaLayerGroup,
  FaTools,
  FaCheckCircle,
  FaArrowLeft,
  FaMousePointer,
  FaGlobe
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiVercel
} from "react-icons/si";

import autopilot_dashboard_1 from '../../../public/images/pixentix_dashboard_1.png';
import autopilot_dashboard from '../../../public/images/pixentix_dashboard.png';


const primaryColor = '#8F75E6';


const AutopilotPOSCaseStudy = () => {

return (
<div className="min-h-screen bg-white">

<Navigation />


{/* Hero Section */}

<section className="pt-28 pb-16 md:pt-36 md:pb-24">

<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="mb-6"
>

<Link
href="/#projects"
className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
>

<FaArrowLeft className="text-xs"/>

<span>
Back to Projects
</span>

</Link>

</motion.div>



<div className="max-w-4xl">


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.6,delay:0.1}}
className="mb-6"
>

<span
className="inline-block text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full"
style={{
color:primaryColor,
backgroundColor:`${primaryColor}08`
}}
>

Retail ERP & Business Management Platform

</span>


</motion.div>



<motion.h1
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.6,delay:0.2}}
className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
>

Autopilot POS

</motion.h1>



<motion.p
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.6,delay:0.3}}
className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed"
>

A complete retail ERP and POS management platform that helps businesses manage products, inventory, orders, customers, analytics, and financial operations from a single dashboard.

</motion.p>



<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.6,delay:0.4}}
>


<Link
href="https://autopilot-dashboard-opal.vercel.app/"
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-white shadow-lg"
style={{
backgroundColor:primaryColor
}}
>

Visit Dashboard

<FaExternalLinkAlt className="text-sm"/>

</Link>


</motion.div>



</div>


</div>

</section>





{/* Hero Image */}

<section className="pb-20 md:pb-28">


<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


<motion.div

initial={{
opacity:0,
scale:0.98
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:0.8,
delay:0.5
}}

className="rounded-2xl overflow-hidden shadow-2xl"

>


<div className="relative w-full aspect-video">


<Image

src={autopilot_dashboard}

alt="Autopilot POS Dashboard"

fill

className="object-cover"

priority

sizes="100vw"

/>


</div>


</motion.div>


</div>


</section>







{/* Main Content */}

<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">






{/* Project Overview */}


<section className="mb-20 md:mb-28">


<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
margin:"-100px"
}}

transition={{
duration:0.6
}}

>


<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">

Project Overview

</h2>


<div
className="h-1 w-16 mb-8 rounded-full"
style={{
backgroundColor:primaryColor
}}
></div>



<p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">

Autopilot POS is a complete retail ERP system designed to simplify business operations. It provides a centralized platform for managing products, inventory, sales, customers, orders, payments, and business analytics.

The system gives business owners real-time visibility into their operations through a modern dashboard with actionable insights.

</p>





<div className="grid sm:grid-cols-2 gap-6">


{[

{
icon:FaRocket,
title:"Real-time Analytics",
desc:"Track revenue, orders, customers, and business performance instantly."
},

{
icon:FaPuzzlePiece,
title:"Inventory Management",
desc:"Manage products, categories, stock levels, and low-stock alerts."
},

{
icon:FaCreditCard,
title:"Order Management",
desc:"Handle customer orders, payments, and delivery workflows."
},

{
icon:FaDesktop,
title:"Business Dashboard",
desc:"Control complete business operations from one powerful interface."
}


].map((item,idx)=>{


const Icon=item.icon;


return (

<motion.div

key={idx}

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
margin:"-50px"
}}

transition={{
duration:0.5,
delay:idx*0.1
}}

className="p-6 rounded-xl border border-gray-200 hover:shadow-lg bg-white"

>


<div className="flex items-start gap-4">


<div

className="p-3 rounded-lg"

style={{
backgroundColor:`${primaryColor}10`
}}

>

<Icon

style={{
color:primaryColor,
fontSize:'1.5rem'
}}

/>


</div>


<div>

<h3 className="font-semibold text-lg mb-2 text-gray-900">

{item.title}

</h3>


<p className="text-gray-600 text-sm">

{item.desc}

</p>


</div>


</div>


</motion.div>


)


})}


</div>



</motion.div>


</section>
// Challenge & Solution


<section className="mb-20 md:mb-28">

<motion.div
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true,margin:"-100px"}}
transition={{duration:0.6}}
>


<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
Challenge & Solution
</h2>


<div
className="h-1 w-16 mb-8 rounded-full"
style={{backgroundColor:primaryColor}}
></div>


<p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">

Managing retail operations manually creates problems with inventory tracking, order processing, financial reporting, and customer management. Autopilot POS solves this by providing a centralized ERP dashboard where businesses can monitor and manage every important operation from one place.

</p>



<div className="grid sm:grid-cols-3 gap-4">


{[
'Centralized product and inventory management',
'Real-time sales and revenue analytics',
'Complete order and customer management'
].map((item,idx)=>(

<div
key={idx}
className="flex items-start gap-3 p-5 rounded-xl bg-gray-50 border border-gray-100"
>

<FaCheckCircle
className="text-xl mt-0.5 flex-shrink-0"
style={{color:primaryColor}}
/>

<span className="text-gray-700 text-sm leading-relaxed">
{item}
</span>

</div>

))}


</div>


</motion.div>

</section>






{/* Dashboard Interface */}

<section className="mb-20 md:mb-28">


<motion.div

initial={{opacity:0,y:30}}

whileInView={{opacity:1,y:0}}

viewport={{once:true,margin:"-100px"}}

transition={{duration:0.6}}

>


<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">

Admin Dashboard

</h2>


<div
className="h-1 w-16 mb-12 rounded-full"
style={{backgroundColor:primaryColor}}
></div>




<div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">


<div>


<div className="flex items-center gap-4 mb-6">


<div
className="p-3 rounded-lg"
style={{
backgroundColor:`${primaryColor}10`
}}
>

<FaTools
style={{
color:primaryColor,
fontSize:'1.75rem'
}}
/>


</div>


<h3 className="text-2xl md:text-3xl font-bold text-gray-900">

Powerful ERP Dashboard

</h3>


</div>



<p className="text-gray-700 mb-6 leading-relaxed text-lg">

The Autopilot POS dashboard provides business owners with complete control over daily operations including products, inventory, orders, customers, financial analytics, and user administration.

</p>



<ul className="space-y-4">


{[

'Monitor business analytics in real time',

'Manage products, categories, and inventory',

'Track orders, revenue, and customer activity'

].map((item,idx)=>(


<li
key={idx}
className="flex items-start gap-3"
>


<span
className="text-sm font-bold mt-1 rounded-full w-7 h-7 flex items-center justify-center text-xs text-white"
style={{
backgroundColor:primaryColor
}}
>

{idx+1}

</span>


<span className="text-gray-700 leading-relaxed pt-1">

{item}

</span>


</li>


))}


</ul>


</div>




<div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">


<div className="relative w-full aspect-[4/3]">


<Image

src={autopilot_dashboard_1}

alt="Autopilot POS ERP Dashboard"

fill

className="object-contain"

sizes="(max-width:1024px) 100vw,50vw"

/>


</div>


</div>



</div>


</motion.div>


</section>







{/* Key Features */}

<section className="mb-20 md:mb-28">


<motion.div

initial={{opacity:0,y:30}}

whileInView={{opacity:1,y:0}}

viewport={{once:true,margin:"-100px"}}

transition={{duration:0.6}}

>


<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">

Key Features

</h2>


<div
className="h-1 w-16 mb-12 rounded-full"
style={{backgroundColor:primaryColor}}
></div>



<div className="grid sm:grid-cols-3 gap-8">


{[

{
icon:FaLayerGroup,
title:'Product Management',
desc:'Manage products, categories, pricing, and stock information efficiently.'
},

{
icon:FaMousePointer,
title:'Sales & Orders',
desc:'Track customer orders, payments, and delivery status easily.'
},

{
icon:FaGlobe,
title:'Business Intelligence',
desc:'Analyze revenue, customers, and sales performance through dashboards.'
}


].map((item,idx)=>{


const Icon=item.icon;


return (

<motion.div
key={idx}
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true,margin:"-50px"}}
transition={{duration:0.5,delay:idx*0.1}}
className="text-center"
>


<div className="mb-6 flex justify-center">

<div
className="p-4 rounded-2xl"
style={{
backgroundColor:`${primaryColor}10`
}}
>

<Icon
style={{
color:primaryColor,
fontSize:'2rem'
}}
/>

</div>

</div>



<h3 className="font-semibold text-xl mb-3 text-gray-900">

{item.title}

</h3>


<p className="text-gray-600 leading-relaxed text-sm">

{item.desc}

</p>


</motion.div>

)


})}



</div>


</motion.div>


</section>







{/* Technology Stack */}

<section className="mb-20 md:mb-28">


<motion.div

initial={{opacity:0,y:30}}

whileInView={{opacity:1,y:0}}

viewport={{once:true,margin:"-100px"}}

transition={{duration:0.6}}

>


<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">

Technology Stack

</h2>


<div
className="h-1 w-16 mb-12 rounded-full"
style={{backgroundColor:primaryColor}}
></div>



<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">


{[

{icon:SiNextdotjs,name:'Next.js'},
{icon:SiTypescript,name:'TypeScript'},
{icon:SiMongodb,name:'MongoDB'},
{icon:SiExpress,name:'Express.js'},
{icon:SiTailwindcss,name:'Tailwind CSS'},
{icon:SiVercel,name:'Vercel'}

].map((tech,idx)=>{


const Icon=tech.icon;


return (

<div

key={idx}

className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg"

>


<Icon className="text-4xl mb-3"/>


<span className="text-sm font-medium text-gray-700">

{tech.name}

</span>


</div>

)


})}


</div>


</motion.div>


</section>







{/* Results & Impact */}

<section className="mb-20 md:mb-28">


<motion.div

initial={{opacity:0,y:30}}

whileInView={{opacity:1,y:0}}

viewport={{once:true,margin:"-100px"}}

transition={{duration:0.6}}

>


<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">

Results & Impact

</h2>


<div
className="h-1 w-16 mb-12 rounded-full"
style={{backgroundColor:primaryColor}}
></div>



<div className="grid sm:grid-cols-3 gap-8">


{[

{
value:'Real-time',
title:'Analytics',
desc:'Live insights into business performance and revenue.'
},

{
value:'Complete',
title:'ERP System',
desc:'Products, inventory, orders, customers, and finance management.'
},

{
value:'Multi-role',
title:'Administration',
desc:'Secure user management and business control.'
}

].map((item,idx)=>(


<div
key={idx}
className="text-center p-8 rounded-xl border border-gray-200"
>


<div
className="text-5xl font-bold mb-4"
style={{color:primaryColor}}
>

{item.value}

</div>


<h3 className="font-semibold text-xl mb-3">

{item.title}

</h3>


<p className="text-gray-600 text-sm">

{item.desc}

</p>


</div>


))}


</div>


</motion.div>


</section>



</div>





<footer className="py-16 border-t border-gray-200 bg-gray-50">


<div className="max-w-4xl mx-auto px-4 text-center">


<h2
className="text-3xl font-bold mb-4"
style={{color:primaryColor}}
>

Autopilot POS

</h2>


<p className="text-gray-600">

A complete ERP and POS solution for managing modern retail businesses.

</p>


</div>


</footer>


</div>

);

};


export default AutopilotPOSCaseStudy;