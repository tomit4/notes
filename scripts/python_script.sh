##!/bin/python3

#print("RUN THIS DIRECTLY FROM PYTHON!")

#!/bin/bash

python - <<'END_SCRIPT'
print("TESTPRINT")
END_SCRIPT

python -c 'print("ANOTHER_TEST_PRINT")'

python <<< 'print("YET_ANOTHER_TEST")'

echo "THIS IS BASH TALKING NOW"
