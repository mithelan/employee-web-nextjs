import { wrapper } from "../../store/store";

import Grid from "@mui/material/Grid";
import { map } from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { Actions } from "../../components/actions";
import getGender from "../../utill";

function EmployeeList({ employeeData }) {
  return (
    <Grid  container spacing={2}>
      {map(employeeData.employees, (data,index) => {
        return (
          <Grid key={index} item xs={4}>
            <div>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.photo}
                    alt="img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.firstName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +{data.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getGender(data.gender)}
                    </Typography>
                    <CardActions>
                      <Actions data={data} />
                    </CardActions>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default wrapper.withRedux(EmployeeList);
