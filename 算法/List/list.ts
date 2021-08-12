
class ListNode {
    next: ListNode = null
    val: number = -1
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
let middleNode = (head: ListNode) => {
    let fast = head
    let low = head
    while (fast && fast.next) {
        fast = fast.next.next
        low =low.next
    }
    return low
}

/** 链表划分 */
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