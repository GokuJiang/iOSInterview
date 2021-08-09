# 数据结构

## 二叉树
https://juejin.cn/post/6844903669326954504
1. 求二叉树节点个数
```javascript
var nodeNumsOfBTree = (root) => {
    if (!root) return 0
    return nodeNumsOfBTree(root.left) + nodeNumOfBTree(root.right) + 1
}
```

2. 求二叉树最大深度
```javascript
    var maxDeep = (root) => {
        if (!root) return 0
        return Math.max(maxDeep(root.left), maxDeep(root.right)) + 1
    }
```

3. 求二叉树最小深度

```javascript
    var minDeep = (root) => {
        if (!root) return 0
        let leftDeep = minDeep(root.left)
        if (leftDeep === 0) {
            leftDeep = MAX_INT
        }
        let rightDeep = maxDeep(root.right)
        if (rightDeep === 0) {
            rightDeep = MAX_INT
        }
        return Math.min(leftDeep, rightDeep)
        // return (rightDeep == 0|| leftDeep == 0) ? left + right + 1: Math.min(left, right) + 1;
    }
```

4. 先序遍历

```javascript
// 递归法
var preOrderReverse = (root) => {
    let result = []
    preOrder(root, result);
    return result; 
}

var preOrder = (root, result) => {
    if (root === null) return
    result.push(root.val)
    preOrder(root.left, result)
    preOrder(root.right, result)
} 

//非递归法
var preorderTraversal = (root) => {
    if (!root) return []
    let result = []
    let stack = [root]
    while(stack.length > 0) {
        let cur = stack.
    }
}


```