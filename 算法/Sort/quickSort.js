
// var sort = (arr) => {
//     if (arr.length < 2) return arr;

// }

var swap = (arr, i, j) => {
    let temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
}

var insertSort = (arr, low, high) => {
    if ((arr?.length ?? 0) == 0) return
    for (let i = low + 1; i <= high; i++) {
        let j = i
        while (j >= low && arr[j] < arr[j-1]) {
            swap(arr, j, j - 1)//只要小就交换操作
            j--
        }
    }
}

var shellSort = (arr, low, high) => {
    if ((arr?.length ?? 0) == 0) return
    // 间隔序列，在希尔排序中我们称之为增量序列
    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        //分组
        for (let gapStartIndex = low; gapStartIndex < gap; gapStartIndex++) {
            for (let currentIndex = gapStartIndex + gap; currentIndex < high; currentIndex += gap) {
                const currentNum = arr[currentIndex]
                let preIndex = currentIndex - gap
                while (preIndex >= gapStartIndex && currentNum < arr[preIndex]) {
                    arr[preIndex + gap] = arr[preIndex]
                    preIndex -= gap
                }
                arr[preIndex + gap] = currentNum;
            }
        }
    }
}

var selectSort = (arr, low, high) => {
    if ((arr?.length ?? 0) == 0) return
    for (let i = low; i <= high; i++) {
        let min = i
        for (let j = i + 1; j <= high; j++) {
            if (arr[j] < arr[min]) {
                min = j
            }
            if (i != min) {
                swap(arr, i, min)
            }
        }
    }
}

var heapSort = (arr, low, high) => {
    for (let i = arr.length / 2 - 1; i >= 0; i--) {
        adjustHeap(arr, i, arr.length)
    }

    for (let j = arr.length - 1; j > 0; j--) {
        swap(arr, 0, j)
        adjustHeap(arr, 0, j)
    }
}

var adjustHeap = (arr, i, length) => {
    let temp = arr[i]

    for (let k = i * 2 + 1; k < length; k = k * 2 + 1) { //从i结点的左子结点开始，也就是2i+1处开始
        if (k + 1 < length && arr[k] < arr[k + 1]) { //如果左子结点小于右子结点，k指向右子结点
            k++ 
        }
        if (arr[k] > temp) { //如果子节点大于父节点，将子节点值赋给父节点（不用进行交换）
            arr[i] = arr[k]
            i = k
        } else {
            break
        }
    }
    arr[i] = temp;//将temp值放到最终的位置
}

var mergeSort = (arr) => {
    if (arr?.length < 1) return
    let sliceTarget = arr.length >> 1
    let arrA = arr.slice(0, sliceTarget)
    let arrB = arr.slice(sliceTarget)
    return mergeTowArray(arrA, arrB)
}

var mergeTowArray = (arrA, arrB) => {
    let i, j = 0
    let result = []
    while (i < arrA.length, j < arrB.length) {
        if (arrA[i] <= arrB[j]) {
            result.push(arrA[i])
            i++
        } else {
            result.push(arrB[j])
            j++
        }
    }

    while (i < arrA.length) {
        result.push(arrA[i])
        i++
    }
    while (j < arrB.length) {
        result.push(arrB[j])
        j++
    }
    return result
}

var selectPivotMedianOfThree = (arr, low, high) => {
    let mid = low + ((high - low) >> 1)
    if (arr[mid] > arr[high]) {
        swap(arr,mid, high)
    }
    if (arr[low] > arr[high]) {
        swap(arr, low, high)
    }
    if (arr[mid] > arr[low]) {
        swap(arr, mid, low)
    }
    return arr[low]
}

var quickSort = (arr, low, high, insertFunc) => {
    if (low === high) {
        return
    }
    let first = low
    let left = low
    let last = high
    let right = high
    let leftLength = 0
    let rightLength = 0
    if (high - low + 1 < 10) {
        insertFunc(arr, low, high)
        return
    }

    const piovt = selectPivotMedianOfThree(arr, low, high);//使用三数取中法选择枢轴

    while (low < high) {
        while (low < high && arr[high] >= piovt) {
            if (arr[high] === piovt) {
                swap(arr, right, high)
                right--
                rightLength++
            }
            high--
        }
        arr[low] = arr[high]
        while (low < high && arr[low] <= piovt) {
            if (arr[low] === piovt) {
                swap(arr, low, left)
                left++
                leftLength++
            }
            low++
        }
        arr[high] = arr[low]
    }
    arr[low] = piovt
    //一次快排结束将重复元素聚集到piovt位置

    let i = low - 1
    let j = first
    while (j < left && arr[i] != piovt) {
        swap(arr, i, j)
        i--
        j++
    }
    i = low + 1
    j = last
    while (j > right && arr[i] != piovt) {
        swap(arr, i, j)
        i++
        j--
    }

    quickSort(arr, first, low - 1 - leftLength, insertFunc)
    quickSort(arr, low + 1 + rightLength, last, insertFunc)
}


var gnerateTestData = (num) => {
    // Math.random
    let arrRandom = [];
    for (let i = 0; i < num; i++) {
        arrRandom.push(Math.floor(Math.random() * num))
    }

    let arr2 = [];
    for (let i = 0; i < num; i++) {
        arr2.push(i)
    }

    let arr3 = [];
    for (let i = num; i > 0; i--) {
        arr3.push(i)
    }

    let arrReapt = [];
    for (let i = 0; i < num; i++) {
        arrReapt.push(Math.floor(Math.random() * 50))
    }
    return [arrRandom, arr2, arr3, arrReapt]
}

const t1 = performance.now()
let arrs = gnerateTestData(10000)
const t2 = performance.now()
console.log('test data loaded ', t2 - t1)

for (let i = 0; i < arrs.length; i++) {
    let data1 = arrs[i].map(E=>E)
    let data2 = arrs[i].map(E => E)
    let data3 = arrs[i].map(E => E)

    console.log('start compare',i)
    const a1 = performance.now();
    quickSort(data1, 0, data1.length - 1, insertSort)
    const a2 = performance.now();

    const a3 = performance.now();
    selectSort(data2, 0, data2.length - 1)
    const a4 = performance.now();

    const a5 = performance.now();
    // shellSort(data3, 0, data3.length - 1)
    quickSort(data3, 0, data2.length - 1, selectSort)
    const a6 = performance.now();
    
   

    console.log(i, 'quick(select):', a2 - a1, 'quick(select):', a6 - a5, 'system: ', a4 - a3);
}




