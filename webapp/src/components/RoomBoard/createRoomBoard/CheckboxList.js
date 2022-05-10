import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

let checklist = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const CheckboxList = (props) => {
  const checked = props.checked;
  const setChecked = props.setChecked;
  const [checked2, setChecked2] = React.useState([]);
  const checkList = [ "에어컨", "냉장고", "세탁기", "가스레인지", "전자레인지", "책상", "책장", "옷장", "신발장"]
  const [isChecked, setIsChecked] = React.useState({
      "에어컨": false,
      "냉장고": false, 
      "세탁기": false,
      "가스레인지": false,
      "전자레인지": false,
      "책상": false,
      "책장": false,
      "옷장": false,
      "신발장": false
  });

  const checkNumList = [];


  const handleToggle = (value) => () => {
    const currentIndex = checkList.indexOf(value);

    if (checklist[currentIndex] == 0) {
      checklist = checklist.fill(1, currentIndex,currentIndex+1);
    } else if (checklist[currentIndex] == 1) {
      checklist = checklist.fill(0, currentIndex,currentIndex+1);
    }
    console.log(currentIndex, checklist);

    setChecked(checklist);
    console.log("checked 변수에 반영", checked); // set 함수가 완료되는거 보다 더 빨리 log가 출력되서 좀 이상해보이긴함

    const currentIndex2 = checked2.indexOf(value);
    const newChecked = [...checked2];

    if (currentIndex2 === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex2, 1);
    }

    setChecked2(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
      {checkList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked2.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckboxList