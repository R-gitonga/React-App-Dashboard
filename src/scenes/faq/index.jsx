import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ =() => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Header title="FAQ" subtitle="Frequently Asked Qiestions Page" />
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        An Important Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Incidunt, molestiae veniam aliquam ipsa tempore quae ullam facere cupiditate provident quas fugiat cum quidem, 
                        doloremque ipsam eveniet labore reprehenderit sit, quis harum error ex neque a? 
                        Consequuntur ipsam, enim mollitia, minus numquam itaque quibusdam voluptate assumenda eaque nisi, nulla cupiditate! Ipsum!
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Another Important Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Incidunt, molestiae veniam aliquam ipsa tempore quae ullam facere cupiditate provident quas fugiat cum quidem, 
                        doloremque ipsam eveniet labore reprehenderit sit, quis harum error ex neque a? 
                        Consequuntur ipsam, enim mollitia, minus numquam itaque quibusdam voluptate assumenda eaque nisi, nulla cupiditate! Ipsum!
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Your Favorite Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Incidunt, molestiae veniam aliquam ipsa tempore quae ullam facere cupiditate provident quas fugiat cum quidem, 
                        doloremque ipsam eveniet labore reprehenderit sit, quis harum error ex neque a? 
                        Consequuntur ipsam, enim mollitia, minus numquam itaque quibusdam voluptate assumenda eaque nisi, nulla cupiditate! Ipsum!
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Some Random Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Incidunt, molestiae veniam aliquam ipsa tempore quae ullam facere cupiditate provident quas fugiat cum quidem, 
                        doloremque ipsam eveniet labore reprehenderit sit, quis harum error ex neque a? 
                        Consequuntur ipsam, enim mollitia, minus numquam itaque quibusdam voluptate assumenda eaque nisi, nulla cupiditate! Ipsum!
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Your final question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Incidunt, molestiae veniam aliquam ipsa tempore quae ullam facere cupiditate provident quas fugiat cum quidem, 
                        doloremque ipsam eveniet labore reprehenderit sit, quis harum error ex neque a? 
                        Consequuntur ipsam, enim mollitia, minus numquam itaque quibusdam voluptate assumenda eaque nisi, nulla cupiditate! Ipsum!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default FAQ;