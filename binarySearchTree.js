function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    add(data) {
        const node = new Node(data);

        if (!this.root) {
            this.root = node;
        } else {
            this.insertNode(node);
        }
    }

    insertNode(node) {
        let current = this.root;
        while(current) {
            if(node.data < current.data) {
                if(!current.left) {
                    current.left = node;
                    break;
                }
                current = current.left
            } else if (node.data > current.data) {
                if(!current.right) {
                    current.right = node;
                    break;
                }
                current = current.right
            } else {
                break;
            }
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, data) {
        if (!node) {
            return null;
        }
        if (data === node.data) {
            if (!node.left && !node.right) {
                return null;
            }
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }
            const temp = this.getMin(node.right);
            node.data = temp;
            node.right = this.removeNode(node.right, temp);
            return node;
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else {
            node.right = this.removeNode(node.right, data);
            return node;
        }
    }

    getMin(node) {
        if (!node) {
            node = this.root;
        }

        while (node.left) {
            node = node.left;
        }

        return node.data;
    }

    search(node, data) {
        if (node === null) {
            return null;
        } else if (data < node.data) {
            return this.search(node.left, data);
        } else if (data > node.data) {
            return this.search(node.right, data);
        } else {
            return node;
        }
    }

    preOrder(node, fn) {
        if (node) {
            if (fn) {
                fn(node);
            }
            this.preOrder(node.left, fn);
            this.preOrder(node.right, fn);
        }
    }

    traverse(cb, method) {
        const current = this.root;

        if (method) {
            this[`${method}`](current, cb);
        } else {
            this.preOrder(current, cb);
        }
    }

    print() {
        this.traverse((node) => {
            console.log(
                `Node.data: ${node.data}`,
                `Node.left: ${node.left ? node.left.data : null}`,
                `Node.right: ${node.right ? node.right.data : null}`
            )
        })
    }
}

let tree = new BinarySearchTree();
tree.add(5)
tree.add(3)
tree.add(9)
tree.add(2)
tree.print()
console.log(tree.search(tree.root, 511))