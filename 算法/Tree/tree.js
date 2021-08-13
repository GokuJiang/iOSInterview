/** 先序遍历*/
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
    while (stack.length > 0) {
        let cur = stack.pop()
        result.push(cur.val)
        if (cur.left) {
            stack.push(cur.left)
        }
        if (cur.right) {
            stack.push(cur.right)
        }
    }
    return result
}

/** 中序遍历 */
/** 后序遍历 */

/** 从上到下层次遍历*/
var levelTraversal = (root) => {
    if (!root) return []
    let result = []
    let queue = [root]
    while (queue.length > 0) {
        let levelArr = []
        const size = queue.size
        for (let i = 0; i < size; i++) {
            let cur = queue.shift()
            levelArr.push(cur.val)
            if (cur.left) {
                queue.push(cur.left)
            }
            if (cur.right) {
                queue.push(cur.right)
            }
        }
        result.push(levelArr)
    }
    return result
}

/** 从下到上层次遍历*/
var reverseLevelTraversal = (root) => {
    if (!root) return []
    let result = []
    let queue = [root]
    while (queue.length > 0) {
        let levelArr = []
        const size = queue.size
        for (let i = 0; i < size; i++) {
            let cur = queue.shift()
            levelArr.push(cur.val)
            if (cur.left) {
                queue.push(cur.left)
            }
            if (cur.right) {
                queue.push(cur.right)
            }
        }
        result.unshift(levelArr)
    }
    return result
}

/** 按之字形顺序打印二叉树 */
var Z_PrintBinaryTree = (root) => {
    if (!root) return
    let result = []
    let flag = 1
    let stack1 = []
    let stack2 = [root]
    while (stack1.length > 0 || stack2.length > 0) {
        let temp = []
        if (flag % 2 == 0) {
            while (stack1.length > 0) {
                let curNode = stack1.pop()
                temp.push(curNode.val)
                if (curNode.right) {
                    stack2.push(curNode.right)
                }
                if (curNode.left) {
                    stack2.push(curNode.left)
                }
            }
        } else {
            while (stack2.length > 0) {
                let curNode = stack2.pop()
                temp.push(curNode.val)
                if (curNode.right) {
                    stack1.push(curNode.right)
                }
                if (curNode.left) {
                    stack1.push(curNode.left)
                }
            }
        }
        result.push(temp)
        flag++
    }
    return result
}
/** 二叉树第K层的节点个数 */
var k_level_number = (root, k) => {
    if (!root || k <= 0) return 0
    if (root && k === 1) return 1
    return k_level_number(root.left, k-1) + k_level_number(root.right, k-1)
}

/**求二叉树第K层的叶子节点个数*/
var k_level_leaf_number = (root, k) => {
    if (!root || k <= 0) return 0
    if (root && k === 1) {
        if (root.left === null && root.right === null) {
            return 1
        } else {
            return 0
        }
    }
    return k_level_leaf_number(root.left, k - 1) +
        k_level_leaf_number(root.right, k - 1)
}

/** 判断两颗二叉树是否相等*/
var isSameBinaryTree = (pRoot, qRoot) => {
    if (!pRoot && qRoot) return true
    if (!pRoot || !qRoot) return false //第一步把两个都为空的判断过了，所以这步就不包含前一种情况
    if (pRoot == qRoot) {
        return isSameBinaryTree(pRoot.left, qRoot.left) && isSameBinaryTree(pRoot.right, qRoot.right)
    }
    return false
}

/** 判断平衡二叉树 */
var isBalanceBinaryTree = (root) => {
    if (!root) return true
    return Math.abs(maxHeight(root.left) - maxHeight(root.right)) <= 1 &&
        isBalanceBinaryTree(root.left) && isBalanceBinaryTree(root.right)
}

var maxHeight = (root) => {
    if (!root) return 0
    return Math.max(maxHeight(root.left), maxHeight(root.right)) + 1
}

/** 翻转二叉树 或 镜像二叉树 */
var mirrorBinaryTree = (root) => {
    if (!root) return root
    let node = root.left
    root.left = mirrorBinaryTree(root.right)
    root.right = mirrorBinaryTree(node)
    return root
}

/** 给定一个二叉树，检查它是否是镜像对称的。 */
var isSymmetricBinartTree = (root) => {
    var helper = (left, right) => {
        if (left == null && right == null) return true
        if (left = null || right == null) return false
        if (left.val !== right.val) return false
        return helper(left.left, right.right) && helper(left.right,right.left) 
    }
    return root == null || helper(root.left, root.right);
}

/**求二叉树中两个节点的最低公共祖先节点 */
var lowestCommonAncestorOfBinaryTree = (root, p, q) => {
    if (root == null || root == p || root == q) return root;
    let leftLCA = lowestCommonAncestorOfBinaryTree(root.left, p, q)
    let rightLCA = lowestCommonAncestorOfBinaryTree(root.right, p, q)
    if (leftLCA != null && rightLCA != null) return root
    return leftLCA === null ? rightLCA : leftLCA
}

/**求二叉搜索树中两个节点的最低公共祖先节点 */
// 二叉搜索树的特性 left < root < right 可以节约一半的递归
var lowestCommonAncestorOfBST = (root, p, q) => {
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestorOfBST(root.left, p, q)
    } else if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestorOfBST(root.right, p, q)
    }
    return root
}

/** 二叉树直径 */
var diameterOfBinaryTree = (proot) => {
    let path = 0
    var diamHelper = (root) => {
        if (root === null) return 0
        let left = diamHelper(root.left)
        let right = diamHelper(root.right)
        path = Math.max(path, right + left)
        return Math.max(left, right) + 1
    }
    diamHelper(root)
    return path
}

/** 由前序遍历序列和中序遍历序列重建二叉树*/
var generateTreeFromPreAndIN = (preOrder, inOrder) => {
    if (preorder.length == 0 || inorder.length == 0)
        return null;
    
    let buildHelper = (pre, IN) => {
        if (pre.begin > pre.end || IN.begin > IN.end) {
            return null
        }
        let root = new TreeNode(pre.order[pre.begin])
        for (let i = IN.begin; i < IN.end; i++) {
            if (IN.order[i] === pre.order[pre.begin]) {
                root.left = buildHelper({
                    order: pre.order,
                    begin: pre.begin + 1,
                    end: pre.begin + (i - IN.begin)
                }, {
                    order: IN.order,
                    begin: IN.begin + 1,
                    end: i - 1
                })
                root.right = buildHelper({
                    order: pre.order,
                    begin: pre.begin + i - IN.begin + 1,
                    end: pre.end
                }, {
                    order: IN.order,
                    begin: i + 1,
                    end: IN.end
                })
            }
        }
        return root
    }
    return buildHelper({
        order: preOrder,
        begin: 0,
        end: preOrder.length - 1
    }, {
        order: inOrder,
        begin: 0,
        end: inOrder.length - 1
    })
}

/** 判断二叉树是不是完全二叉树 */
let isCompleteTree = (root) => {
    if (!root) return true
    let queue = []
    queue.push(root)
    let flag = false
    while (queue.length > 0) {
        let cur = queue.shift()
        if (cur) {
            if (flag) return false
            queue.push(cur.left)
            queue.push(cur.right)
        } else {
            flag = true
        }
    }
    return true
}

/**  树的子结构 输入两棵二叉树A，B，判断B是不是A的子结构。*/
let hasSubTree = (rootA, rootB) => {
    if (rootA === null || rootB === null) return false
    let isSubTreeHelper = (rootA, rootB) => {
        if (rootB == null)
            return true;
        if (rootA == null)
            return false;
        if (root1.val !== root2.val) return false
            
        return IsSubtree(root1.left, root2.left) &&
                IsSubtree(root1.right, root2.right);
        
    }
    return isSubTreeHelper(rootA, rootB) ||
        hasSubTree(rootA.left, rootB) ||
        hasSubTree(rootA.right, rootB)
}

/** 二叉树中和为某一值的路径 */
var findPathFromTargetInTree = (root, target) => {
    if (!root) return []
    let res = []
    let findHelper = (node, path, sum) => {
        if (!node) return []
        path = [...path, node.val]
        sum -= root.val
        if (sum === 0 && node.left === null && node.right === null) {
            res.push(path)
            return
        }
        findHelper(node.left, path, sum)
        findHelper(node.right, path, sum)   
    }
    let path = []
    findHelper(root, path, target)
    return res
}

/**二叉搜索树的第k个结点 */
let kSmallestNode = (root, k) => {
    if (root === null) return Number.MIN_SAFE_INTEGER
    let stack = []
    let count = 0
    let p = root
    while (p != null || stack.length > 0) {
        if (p != null) {
            stack.push(p)
            p = p.left
        } else {
            let node = stack.pop()
            count++
            if (count == k) return node.val
            p = p.right
        }
    }
    return Number.MIN_SAFE_INTEGER
}
/** 二叉树下一个节点。给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回 */
let nextNodeOfTree = (root) => {
    if (root === null) return root
    if (root.right != null) {
        let p = root.right
        while (p.left != null) {
            node = node.left
        }
        return node
    }
    while (root.left != null) {
        let p = root.left
        if (p.left == root) return p
        root = p
    }
    return null
}