import { useEffect ,useState} from "react";
import QRCode from "react-qr-code";
// animation
import { motion } from 'framer-motion'
import Animation from '../../common/Animation';

import '../../assets/css/print.css';
// icons

const QR = () => {

    const [dispensor, setDispensor] = useState('');
    const [side, setSide] = useState('');
    const [qrString,setQRString] = useState('');
    const [isHiddenQR, setIsHiddenQR] = useState(true);

    const genQR = () => {
        setIsHiddenQR(true);
        setQRString(JSON.stringify({
            dispensor,side
        }));
        setIsHiddenQR(false);
    }

    useEffect(() => {
        window.$('#activePageHead').text('QR Code Generate');
        window.$('#pageSpinner').hide();
        document.title = 'IGL ADMIN | QR Code Generate';
    }, [])
    return (
        <div className="page-wrapper">
            <div className="page-content-wrapper">
                <motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
                    <div className="card dataCard">
                        <div className="card-body">
                            <div className="card-title ">
                            </div>
                            <div className="row">
                                <div className="col-md-6 print_hide">
                                    <fieldset className='formBox' >
                                        <legend>Dispensor</legend>
                                        <input type="text" placeholder="" onChange={e => setDispensor(e.target.value)}   className='formField' />
                                    </fieldset>
                                    <fieldset className='formBox' >
                                        <legend>Side</legend>
                                        <input type="text" placeholder="" onChange={e => setSide(e.target.value)}    className='formField' />
                                    </fieldset>
                                    <button className="btn btn-sm btn-info m-1" onClick={genQR} >Generate QR</button>
                                </div>
                                <div className="col-md-6 ">
                                    <fieldset className='formBox p-2 screen_textLeft print_hideBorder' style={{display : isHiddenQR === false ? 'block' : 'none'}} >
                                        <legend>QR Code</legend>
                                        <h5 style={{fontWeight : 'bold', marginBottom : '20px'}} class="screen_hide" >Dispensor : {dispensor} , Side : {side}</h5>
                                        <QRCode size={250} value={qrString} />
                                    </fieldset> 
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
export default QR;