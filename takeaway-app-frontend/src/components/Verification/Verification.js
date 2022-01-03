// import classes from './Verification.module.css';
// import Card from '../UI/Card';
import { Redirect } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { useEffect } from 'react';
import { baseUrl } from '../../shared/utility';

const Verification = (props) => {

    const token = props.location.pathname.split("/").pop();
    const {sendRequest, error, fetchedData} = useHttp();

//   return (
//     <>
//       <div className={classes.verification}>
//         <Card>
//           <h1>Your Account has now been verified</h1>
//         </Card>
//       </div>
//     </>
//   );

    
useEffect(() => {
    
    if (token.length < 25){
        return;
    }

    if (token){
        sendRequest({url: `${baseUrl}/email/check-verification/${token}`, method: 'POST'})
    }

    }, [sendRequest,token]);


if (token  === ":id" || token ===":"){
    return (<Redirect to="/home"/>)
}


if (token.length < 25){
    return (<Redirect to="/home"/>);
}

if (error){
    return (<Redirect to="/account/verify/error"/>);
}


return (<><Redirect to="/account/verify/confirmation"/></>)
};

export default Verification;
