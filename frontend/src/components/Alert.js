// import React from 'react'

// export default function Alert(props) {
//     return (

//         <div className="alert alert-primary" role="alert">
//             {props.message}
//         </div>

//     )
// }



import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        let lower;
        if (lower === "danger") return "Error";
        lower = word.toLowerCase();
        lower = lower.charAt(0).toUpperCase() + lower.slice(1);

        return lower
    }

    return (
        <>
            <div style={{ height: '50px' }}>

                {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
                    {/* cumaltive layout shift */}
                </div>}
            </div>
        </>
    )

}