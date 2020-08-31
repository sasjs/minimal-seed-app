/**
  @file getdata.sas
  @brief Get Data service - runs on app startup
  @details  This is always the first service called when the app is opened.

  <h4> Dependencies </h4>

**/

%webout(FETCH)

proc sql;
create table springs as select * from sashelp.springs
  where area in (select area from work.areas);

%webout(OPEN)
%webout(OBJ,springs)
%webout(CLOSE)
