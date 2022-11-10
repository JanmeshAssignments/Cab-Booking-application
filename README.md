# Cab-Booking-application

## APIs
### 
 `# "auth-token" Header is always to be present in every api end-point except 'api/rider'  and 'api/driver'. and auth-token is generated in the above endpoints mentioned`
| API | METHOD |   Descriptoni | Data | Access|
| ----------- | ----------- | ---- | ---- | --- |
| `api/rider ` | POST | register rider |  ``` {   name , email, password, username, phone, age}``` |  Public|
| `api/rider/bookingsInACertainTimeFrame` | POST |   Get total successful rides completed in a certain time frame | ```{ startDate, endDate }```|Rider|
| `api/rider/totalAndAverageSpendingInLastWeek` | GET |   Returns Total spending and average spending in last week |  |Rider|
| `api/rider/chooseHyderabad` | GET |   Returns no. of times Hyderabas is chosen as destination | | Rider |
| | | |
| `api/driver` | POST | registers driver |  ``` {   name , email, password, username, phone, age}```| Public |
| `api/driver/highestearningdayofdriver` | GET | returns Highest Earning Day of driver in last week| | Driver |
| `api/driver/totalEarningMadeinTheParticularDayRange` | POST | return total erarnings made in a particular day range| `{ startDate, endDate }` in YYYY-MM-DDTHH:mm:ss.sssZ format| Driver |
| `api/driver/totalSuccessFullRidesCompletedInLastWeek` | GET | return total successfully completd rides in last week| |Driver |
| `api/driver/totalSuccessFullRidesCompletedInLastWeek` | GET | return total successfully completd rides in last week| |Driver |
| | | |
| `api/cab/addcab` | POST| registers new cab|`{  vehicleNumber, vehicleModel, vehicleColor, vehicleCapacity, vehicleImage, lat, long } `|Driver |
| `api/cab/bookCab` | POST| Book a cab|`{ cabId, start_lat, end_lat, start_long, end_long }`| Rider |
| `api/cab/findCab` | POST| find Cabs in the radius of 5km|`{lat, long}`| Public |
| `api/cab/completingARideb` | POST| Completing a ride|`{ rideId }`| Driver |

