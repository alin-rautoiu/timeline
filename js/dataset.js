var dataset = {
        nodes: [
                { name: "spirit", depth: 1 }, //0
                { name: "krigstein", depth: 2}, //1
                { name: "fury", depth: 3}, //2
                { name: "master", depth: 4}, //3
                { name: "daredevil", depth: 5}, //4
                { name: "bendisdare", depth: 6}, //5
                { name: "nhawk", depth: 6.5}, //6
                { name: "hawkeye", depth: 7}, //7
                { name: "invisible", depth: 8}, //8

                
                
        ],
        edges: [
                { source: 0, target: 2, name: 'spirit_fury'},
                { source: 0, target: 4, name: 'spirit_daredevil'},
                { source: 0, target: 7, name: 'spirit_hawkeye'},
                { source: 1, target: 4, name: 'krigstein_daredevil'},
                { source: 1, target: 7, name: 'krigstein_hawkeye'},
                { source: 2, target: 3, name: 'fury_master'},                                                
                { source: 2, target: 4, name: 'fury_daredevil'},
                { source: 2, target: 7, name: 'fury_hawkeye'},
                { source: 3, target: 4, name: 'master_daredevil'},
                { source: 3, target: 7, name: 'master_hawkeye'},
                { source: 4, target: 5, name: 'daredevil_bendisdare'},
                { source: 4, target: 7, name: 'daredevil_hawkeye'},
                { source: 5, target: 7, name: 'bendisdare_hawkeye'},                
                { source: 5, target: 6, name: 'bendisdare_nhawk'},                                                
                { source: 6, target: 7, name: 'nhawk_hawkeye'},
                { source: 7, target: 8, name: 'hawkeye_invisible'}
        ]
};

var dictionary = {
    nodes: [
                { name: "spirit", display: "The Spirit" }, //0
                { name: "krigstein", display: "Krigstein"}, //1
                { name: "fury", display: "Steranko"}, //2
                { name: "master", display: "Master of Kung Fu"}, //3
                { name: "daredevil", display: "Daredevil de Frank Miller"}, //4
                { name: "bendisdare", display: "Daredevil de Bendis"},
                { name: "nhawk", display: 'Marvel "indieficat"'}, //5
                { name: "hawkeye", display: "Hawkeye de Fraction și Aja"}, //6
                { name: "invisible", display: ''}, //7                                
        ],
        edges: [
                { "The Spirit - Steranko": 2, name: 'spirit_fury'},
                { "The Spirit - Daredevil de Frank Miller": 4, name: 'spirit_daredevil'},
                { "The Spirit - Hawkeye de Fraction și Aja": 6, name: 'spirit_hawkeye'},
                { "Krigstein - Daredevil de Frank Miller": 4, name: 'krigstein_daredevil'},
                { "Krigstein - ": 6, name: 'krigstein_hawkeye'},
                { display: 3, name: 'fury_master'},                                                
                { display: 4, name: 'fury_daredevil'},
                { display: 6, name: 'fury_hawkeye'},
                { display: 4, name: 'master_daredevil'},
                { display: 6, name: 'master_hawkeye'},
                { display: 8, name: 'daredevil_bendisdare'},
                { display: 6, name: 'bendisdare_hawkeye'},
                { display: 6, name: 'daredevil_hawkeye'},                                                
                { display: 6, name: 'nhawk_hawkeye'},
                { display: 0, name: 'hawkeye_invisible'}
        ]
}

var years = [1940, 1955, 1965, 1970, 1981, 2001, 2003, 2012];