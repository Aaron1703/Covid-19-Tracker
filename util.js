import numeral from 'numeral';


export const sortData = (data) => {
    const sortedData = [...data];

    function compare(a,b){
        return b.cases - a.cases
    }

    return sortedData.sort(compare)
    
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';