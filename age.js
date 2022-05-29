
  const age = {}
  function ageCal(name,age) {
    let agee = new Date().getFullYear() - age;
    return `hi ${name}, you are ${agee} years old`
}
  const time = ()=> {
    let agee = new Date().getHours()
    return `hi ${agee}`
}

const devs =  [
    {
        id   :  1,
        name :  'abdus samad',
        age  :  23,
        cell :  '01893334'
    },
    {
        id   :  2,
        name :  'abdul jabbar',
        age  :  35,
        cell :  '01893334'
    },
    {
        id   :  3,
        name :  'abdul ahad',
        age  :  28,
        cell :  '0189337634'
    },
]

module.exports = {
    ageCal : ageCal,
    time : time,
    devs : devs
};
/* {
    "deves" : [
    {
     "id" : 1,
     "name" : "abdus samad"
    },
    {
     "id" : 2,
     "name" : "abdul ahad"
    },
    {
     "id" : 3,
     "name" : "abdul jabbar"
    }
],
   "products" :[
       {
        "id" : 1,
        "name" : "pant"
       },
       {
        "id" : 2,
        "name" : "jeans"
       }
   ]
} */
