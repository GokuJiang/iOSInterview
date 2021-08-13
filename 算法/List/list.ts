
class ListNode {
    next: ListNode = null
    val: number = -1
    radom: ListNode = null
    constructor(val: number, next?: ListNode) {
        this.val = val
        this.next = next ?? null
    }
}
/** 1 在 O(1) 时间删除链表节点 */
let deleteNodeO1 = (head: ListNode, node: ListNode) => {
    if (!head || !node) return head
    if (head == node) {
        return head.next
    }
    if (!node.next) { //尾节点 O(n) 遍历少不了
        let p = head
        while (p.next != head) {
            p = p.next
        }
        p.next = null
    } else { // 不用遍历，直接赋值 O(1)实现
        node.val = node.next.val
        node.next = node.next.next
    }
    return head
}
/** 2 翻转链表 */
let reverstAllList = (head: ListNode) => {
    const dummyNode = new ListNode(-1, head)
    let pre = null
    let current = head
    while (current) {
        let next = current.next
        current.next = pre
        pre = current
        current = next
    }
    return pre
}


/** 3 翻转部分单链表 */
let reverseList = (head: ListNode, from: number , to: number) => {
    const dummyNode = new ListNode(-1, head)
    let pre = dummyNode
    for (let i = 0; i < from - 1; i++) {
        pre = pre.next
    }
    let current = pre.next
    for (let i = 0; i < to - from; i++) {
        const next = current.next
        current.next = next.next
        next.next = pre.next
        pre.next = next
    }
    return dummyNode.next
}

/** 4 旋转单链表 */
let rotateRight = (head: ListNode, k: number) => {
    if (!head) return null;
    let n = 1
    let p = head
    while (p) {
        p = p.next
        n++
    }
    p.next = head
    let m = n - k % n
    for (let i = 0; i < m; ++i) {
        p = p.next;
    }
    let newHead = p.next
    p.next = null
    return newHead
}

/** 5 删除单链表倒数第 n 个节点 */
let deleteKNode = (head: ListNode, k: number) => {
    let fast = head
    let low = head
    let i = 0
    while (i < k) {
        fast = fast.next
        i++
    }
    while (fast.next) {
        fast = fast.next
        low = low.next
    }

    let next = low.next
    low.next = low.next.next
    next.next = null
    return head
}

/** 6 求单链表的中间节点 */
// 快慢指针
let middleNode = (head: ListNode) => {
    let fast = head
    let low = head
    while (fast && fast.next) {
        fast = fast.next.next
        low =low.next
    }
    return low
}

/** 7 链表划分 */
let spliceList = (head: ListNode, k: number) => {
    if (!head) return head
    let leftDummy = new ListNode(0)
    let rightDummy = new ListNode(0)
    let left = leftDummy, right = rightDummy

    while (head != null) {
        if (head.val < k) {
            left.next = head
            left = left.next
        } else {
            right.next = head
            right = right.next
        }
        head = head.next
    }
    right.next = null
    left.next = rightDummy.next
    return leftDummy.next
}

/** 8 链表求和 */
let sumWithList = (l1: ListNode, l2: ListNode) => {
    let p1 = l1;
    let p2 = l2;
    let seninel = new ListNode(0)
    let d = seninel
    let sum = 0
    while (p1 != null || p2 != null) {
        sum = Math.floor(sum / 10)
        if (p1 != null) {
            sum += p1.val
            p1=p1.next
        }
        if (p2 != null) {
            sum += p2.val
            p2 = p2.next
        }
        d.next = new ListNode(sum % 10)
        d = d.next
        if (Math.floor(sum / 10) == 1) {
            d.next = new ListNode(1)
        }
        return seninel.next
    }
}

/** 9 单链表排序 */
let sortList = (head: ListNode) => {
    quickSortList(head, null)
    return head
}

let quickSortList = (head: ListNode, tail: ListNode) => {
    if (head != tail) {
        let node = partion(head, tail)
        quickSortList(head, node)
        quickSortList(node.next, tail)
    }
}

let partion = (head: ListNode, tail: ListNode) => {
    let p1 = head
    let p2 = head.next
    while (p2 != tail) {
        if (p2.val < head.val) {
            p1 = p1.next
            let temp = p1.val
            p1.val = p2.val
            p2.val = temp
        }
        p2 = p2.next
    }
    if (p1 != head) {
        let temp = p1.val
        p1.val = head.val
        head.val = temp
    }
    return p1
}

/** 10 合并两个链表 */
let mergerTwoList = (l1: ListNode, l2: ListNode) => {
    let head = new ListNode(0)
    let p = head
    while (l1 && l2) {
        if (l1.val < l2.val) {
            p.next = l1
            l1 = l1.next
        } else {
            p.next = l2
            l2 = l2.next
        }
        p = p.next
    }
    p.next = l1 === null ? l2 : l1
    return head.next    
}

/** 11 复制复杂链表 */
let copyList = (head: ListNode) => {
    if (!head) return head
    let dic = new Map
    let cur = head
    while (cur) {
        dic.set(cur, cur.val)
        cur = cur.next
    }

    cur = head
    while (cur) {
        let temp = dic.get(cur)
        temp.next = dic.get(cur.next)
        temp.random = dic.get(cur.radom)
        cur = cur.next
    }

    return dic.get(head)
}

/** 12 删除链表中重复的结点 */
let deleteRepeatNodeInSortedList = (head: ListNode) => {
    if (!head) return head
    let cur = head
    while (cur.next) {
        if (cur.val = cur.next.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
}

/** 13 判断单链表是否存在环 */
let hasLoop = (head: ListNode) => {
    let fast = head
    let slow = head
    while (fast && fast.next) {
        if (fast === slow) {
            return true
        }
        fast = fast.next.next
        slow = slow.next
    }
    return false
}

/** 14 找环入口 */
//https://blog.csdn.net/sinat_35261315/article/details/79205157
let loopEntry = (head: ListNode) => {
    let fast = head
    let slow = head
    while (fast && fast.next) {
        if (fast === slow) {
            let p = head
            while (p != slow) {
                p = p.next
                slow = slow.next
            }
            return p
        }
        fast = fast.next.next
        slow = slow.next
    }
    return null
}

/** 15 判断两个无环单链表是否相交 */
let isCross = (l1: ListNode, l2: ListNode) => {
    if (null == l1 || null == l2) {
        return false;
    }
    if (l1 == l2) {
        return true;
    }
    while (null != l1.next) {
        l1 = l1.next;
    }
    while (l2.next != null) {
        l2 = l2.next
    }
    return l1 == l2
}

/** 16 两个链表相交扩展：求两个无环单链表的第一个相交点 */
let crossFirstNode = (headA: ListNode, headB: ListNode) => {
    if (!headA || !headB) return null
    let head = headA
    while (head.next) {
        head = head.next
    }
    head.next = headB
    return loopEntry(headA)
}