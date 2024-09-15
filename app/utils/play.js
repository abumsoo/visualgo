function partition(arr, low, high, swaps) {
    var _a, _b, _c;
    // Randomly pick a pivot index between low and high
    var randomPivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
    _a = [arr[high], arr[randomPivotIndex]], arr[randomPivotIndex] = _a[0], arr[high] = _a[1];
    swaps.push([randomPivotIndex, high]); // Record the swap of pivot selection
    var pivot = arr[high];
    var i = low - 1;
    for (var j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            _b = [arr[j], arr[i]], arr[i] = _b[0], arr[j] = _b[1];
            swaps.push([i, j]); // Record the swap
        }
    }
    ;
    _c = [arr[high], arr[i + 1]], arr[i + 1] = _c[0], arr[high] = _c[1];
    swaps.push([i + 1, high]); // Record the swap
    return i + 1;
}
function quickSortRecursive(arr, low, high, swaps) {
    if (low < high) {
        var pi = partition(arr, low, high, swaps);
        quickSortRecursive(arr, low, pi - 1, swaps);
        quickSortRecursive(arr, pi + 1, high, swaps);
    }
}
function quicksort(arr) {
    var swaps = [];
    quickSortRecursive(arr, 0, arr.length - 1, swaps);
    return [arr, swaps];
}
// Example usage:
var arr = [3, 6, 8, 10, 2, 1];
var _a = quicksort(arr), sortedArr = _a[0], swaps = _a[1];
console.log('Sorted Array:', sortedArr);
console.log('Swaps:', swaps);
