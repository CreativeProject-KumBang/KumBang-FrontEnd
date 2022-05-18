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

  const productList = [ "에어컨", "냉장고", "세탁기", "가스레인지", "전자레인지", "책상", "책장", "옷장", "신발장"]
  const [checkedUI, setCheckedUI] = React.useState([]);
  
  const handleToggle = (value) => () => {
    const currentIndex = productList.indexOf(value);

    if (checklist[currentIndex] == 0) {
      checklist = checklist.fill(1, currentIndex,currentIndex+1);
    } else if (checklist[currentIndex] == 1) {
      checklist = checklist.fill(0, currentIndex,currentIndex+1);
    }

    setChecked(checklist);
    console.log(checked); // set 함수가 완료되는거 보다 더 빨리 log가 출력되서 좀 이상해보이긴함

    const currentIndex2 = checkedUI.indexOf(value);
    const newChecked = [...checkedUI];

    if (currentIndex2 === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex2, 1);
    }
    setCheckedUI(newChecked); // ui에 체크 반영
  };

  return (
    <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
      {productList.map((value) => {
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
                  checked={checkedUI.indexOf(value) !== -1}
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