import React from 'react';

import FirstWarning from './FirstWarning'
import SecondWarning from './SecondWarning'
import ThirdWarning from './ThirdWarning'
import { BottomModal } from '../../../../Components';


interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
}


const WarningModal: React.FC<Props> = ({ visible = false, setVisible = () => { } }) => {
    const [index, setIndex] = React.useState(1)

    const renderWarning = () => {
        if (index === 1) return <FirstWarning setVisible={setVisible} setIndex={setIndex} />
        else if (index === 2) return <SecondWarning setIndex={setIndex} />
        else if (index === 3) return <ThirdWarning setVisible={setVisible} />
    }

    return <BottomModal visible={visible} setVisible={setVisible} renderContent={() => renderWarning()} />
}

export default WarningModal;
