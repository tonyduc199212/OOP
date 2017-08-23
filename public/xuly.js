var socket = io("http://localhost:3000");

$(document).ready(function(){
//bai 2
    var arr=[
        
    ];
    var n=0;
    function person(idname,fname,lname,gender,country,bday){    
        this.idname=idname;
        this.fname =fname;
        this.lname=lname;
        this.gender=gender;
        this.country=country;
        this.bday = bday;
        this.update_person = function(idname,fname,lname,gender,country,bday){
            this.idname=idname;
            this.fname =fname;
            this.lname=lname;
            this.gender=gender;
            this.country=country;
            this.bday = bday;
        }
    };

    //var person1= new person();
    function reset(){
        $('#dsnv option[value=-1]').prop("selected", true);
        $("#idname").val("");
        var ma = $("#kt").val();
        console.log(ma[0]);
        $("#fname").val("");
        $("#lname").val("");
        $("[name=gender]").val(["Male"]);
        $("#country").val("");
        $("#bday").val("");
        $("#idname").prop('disabled', false);

    }
    function check1(){
      //  if(Number($("select[name='dsnv']").val())==-1){
        //    return 1;
        //}
        if(find($("#idname").val())>=0) {
            alert("ma bi trung!!");        
            return 1;
        }
        if($("#idname").val()==""){
            alert("nhap idname");
            return 1;
        };
        if($("#fname").val()==""){
            alert("nhap fname");
            return 1;
        };
        if($("#lname").val()==""){
            alert("nhap lname");
            return 1;
        };    
        if($("#country").val()==""){
            alert("nhap country");
            return 1;
        };
        if($("#bday").val()==""){
            alert("nhap birthday");
            return 1;
        };
        return 0;        
    }
    function add_person(m){
        arr[m]= new person($("#idname").val(),$("#fname").val(),$("#lname").val(),$("input[name='gender']:checked").val(),$("#country").val(),$("#bday").val() );
		//var student = arr[m];
		
		//function success(res){
		//	console.log(res);
	//	}
		
	//	$.ajax({
	//		type: "POST",
	//		url: "/api/student",
	//		data: student,
	//		success: success,
	//	dataType: 'JSON'
//});
    }
    function show(){
        var i=Number($("select[name='dsnv']").val());
        $("#idname").val(arr[i].idname);
        $("#idname").prop('disabled', true);
        $("#fname").val(arr[i].fname);
        $("#lname").val(arr[i].lname);
        $("[name=gender]").val([arr[i].gender]);
        $("#country").val(arr[i].country);
        $("#bday").val(arr[i].bday);    
    }
    function find(idname){
        for(var i=0;i<n;i++){
            if(arr[i].idname==idname) return i;
        };
        return -1;
    }
    $("#dsnv").change(function(){
        if(Number($("select[name='dsnv']").val())==-1) 
            reset();
        else
            show();
    })
    function show_list(){
        console.log(arr.length);
        $("#dsnv").html("");
        $("#dsnv").append($('<option>',{
                value: -1,
                text: "Danh sách sinh viên"
            }));   

        for(var i=0;i<n;i++){
            $("#dsnv").append($('<option>',{
                value: i,
                text: arr[i].idname+"  ( "+arr[i].fname+" "+arr[i].lname+" )"
            }));   
        }
        reset();        
    }
    $("#btn_clear").click(function(){
        reset();
        
    })
    $("#btn_update").click(function(){
        var i=Number($("select[name='dsnv']").val());
        if(i==-1) return;
        //add_person(i);
        arr[i].update_person($("#idname").val(),$("#fname").val(),$("#lname").val(),$("input[name='gender']:checked").val(),$("#country").val(),$("#bday").val() );
        show_list();
    })
    $("#btn_delete").click(function(){
        var i=Number($("select[name='dsnv']").val());
        if(i==-1) return;
        delete arr[i];
        for(i;i<n;i++){
            arr[i]=arr[i+1];
        }
        if(n!=0) n--;
        console.log(n);
        show_list();
        
    })
    $("#btn_add").click(function(){ 
        if(check1()==1) return;
        
        add_person(n); 
        n++;
        console.log(arr[n-1].idname);  
        $("#dsnv").append($('<option>',{
            value: n-1,
            text: arr[n-1].idname+"  ( "+arr[n-1].fname+" "+arr[n-1].lname+" )"
        }));   
        reset();     
    })

    //bài 1
    var so2,so10,so16;    
    $("#btn_clear_number").click(function(){
        $("#coso2").val("");
        $("#coso10").val("");
        $("#coso16").val("");
        $("#coso2").prop('disabled', false);
        $("#coso10").prop('disabled', false);
        $("#coso16").prop('disabled', false);
        check=0;
    });
    function reverse(s){
        var str="";
        for(var i=s.length-1;i>=0;i--){
            str=str+s[i];
        }
        return str;
    }

    function convert_2_10(n){
        var temp=0;
        var i=0;
        while(n!=0){            
            temp = temp+n%10*Math.pow(2,i);
            n=Math.floor(n/10);         
            i++;            
        } 
        return temp.toString();
    }
    function convert_2_16(n){
        console.log(n);
        var temp=0;
        var tam="";
        var k;
        //var i=0;
        while(n!=0){
            temp = n%10000;
            n=Math.floor(n/10000);    
           
            k=Number(convert_2_10(temp));
            console.log(k);
            if(k<10){
                tam=tam+" "+k.toString();
            }
            else{
                switch(k){
                    case 10: tam=tam+' A'; break;
                    case 11: tam=tam+' B'; break;
                    case 12: tam=tam+' C'; break;
                    case 13: tam=tam+' D'; break;
                    case 14: tam=tam+' E'; break;
                    case 15: tam=tam+' F'; break;
                }
            };
            ;           
        }

        return reverse(tam);
    }
    function convert_10_2(n){
        var temp="";       
        while(n!=0){
            temp = temp+n%2;
            n=Math.floor(n/2); 
        } 
        return reverse(temp);
    }
    function convert_16_2(n){
        var temp="";
        for(var i = 0;i<n.length;i++){
            switch(n[i]){
                case 'A': temp=temp+'1010';break;
                case 'B': temp=temp+'1011';break;
                case 'C': temp=temp+'1100';break;
                case 'D': temp=temp+'1101';break;
                case 'E': temp=temp+'1110';break;
                case 'F': temp=temp+'1111';break;
                default :
                    temp=temp+convert_10_2(Number(n[i]));
                    break;                
            }
        }
        return temp;
    }
    function convert_coso2(n){
        n=Number(n);
        so10 = convert_2_10(n);
        so16 = convert_2_16(n);  
    }
    function convert_coso10(n){
        n=Number(n);
        so2 = convert_10_2(n);
        console.log(so2);
        so16 = convert_2_16(so2); 
      
    }
    function convert_coso16(n){      
        so2 = convert_16_2(n);
        so10 = convert_2_10(so2)     
    }
    var check=0;
    $("#coso2").change(function(){
        $("#coso10").prop('disabled', true);
        $("#coso16").prop('disabled', true);
        check=1;
    })
    $("#coso10").change(function(){
        $("#coso2").prop('disabled', true);
        $("#coso16").prop('disabled', true);
        check =2;
    })
    $("#coso16").change(function(){
        $("#coso10").prop('disabled', true);
        $("#coso2").prop('disabled', true);
        check=3;
    })
    $("#btn_convert").click(function(){
        so2=$("#coso2").val();
        so10=$("#coso10").val();
        so16=$("#coso16").val();

        if(check==1){
            convert_coso2(so2);
            $("#coso10").val(so10);
            $("#coso16").val(so16);
        }

        if(check==2){
             console.log(so10);
            convert_coso10(so10);
            $("#coso2").val(so2);
            $("#coso16").val(so16);
        }

        if(check==3){
            convert_coso16(so16);
            $("#coso2").val(so2);
            $("#coso10").val(so10);
        }
    })

});

