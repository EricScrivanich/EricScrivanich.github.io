const people = 
 [
    {
      "name" : "Sam",
      "category" : "Tech",
      "position" : "Manager",
      "salary" : 40000,
      "raise" : true,
    },
    {
        "name" : "Mary",
        "category" : "Finance",
        "position" : "Trainee",
        "salary" : 18500,
        "raise" : true,
      },

      {
        "name" : "Bill",
        "category" : "HR",
        "position" : "Executive",
        "salary" : 21200,
        "raise" : false
      }

]


console.log("Question 1");
console.log(people);

const company = 
     
          {
            "company name" : "Tech Stars",
            "website" : "www.techstars.site",
            "employees" : [
            {
            "name" : "Sam",
            "category" : "Tech",
            "position" : "Manager",
            "salary" : 40000,
            "raise" : true,
            },
            {
            "name" : "Mary",
            "category" : "Finance",
            "position" : "Trainee",
            "salary" : 18500,
            "raise" : true,
            },
              
            {
                "name" : "Bill",
                "category" : "HR",
                "position" : "Executive",
                "salary" : 21200,
                "raise" : false
            }

            ]
          }
    
    
    
    console.log("Question 2");
    console.log(company);


const companyUpdate = 
         
              {
                "company name" : "Tech Stars",
                "website" : "www.techstars.site",
                employees : [
                {
                "name" : "Sam",
                "category" : "Tech",
                "position" : "Manager",
                "salary" : 40000,
                "raise" : true,
                },
                {
                "name" : "Mary",
                "category" : "Finance",
                "position" : "Trainee",
                "salary" : 18500,
                "raise" : true,
                },
                  
                {
                    "name" : "Bill",
                    "category" : "HR",
                    "position" : "Executive",
                    "salary" : 21200,
                    "raise" : false,
                },
                {
                    "name" : "Anna",
                    "category" : "Tech",
                    "position" : "Executive",
                    "salary" : 25600,
                    "raise" : false
                }

    
                ]
              }

          
        
        
       
        
        console.log("Question 3");
        console.log(companyUpdate);

        let totalSalary = 0;
        for(i=0;i<companyUpdate.employees.length; i++)
        {
            totalSalary += companyUpdate.employees[i]['salary'];
            
        }
        console.log("Question 4");
        console.log(totalSalary);

        
        for(i=0; i<companyUpdate.employees.length; i++)
        {
            if(companyUpdate.employees[i]['raise'] == true)
            {
                companyUpdate.employees[i]['salary'] += (companyUpdate.employees[i]['salary'] * .1);
                companyUpdate.employees[i]['raise'] = false;

            }
            
        }
        console.log("Question 5");
        console.log(companyUpdate);


        let arr = ['Anna', 'Sam'];
for (let i = 0; i < newEmployee.employees.length; i++) {
  for(let j = 0; arr.length; j++) {
    if(newEmployee.employees[i]['name'] == arr[j]) {
      newEmployee.employees[i]['wfh'] == true;
    } else {
      newEmployee.employees[i]['wfh'] == false;
    }
  }
}
console.log("Question 6");
console.log(newEmployee);



     

    

