"use strict";
app.controller("mainController", function($scope, $location){
	$scope.app = basel.config;
	$scope.menus = basel.menu();
	$scope.books_table_name = "books";
	$scope.books_table_primary_key = "id";
	$scope.verse_table_name="verses"
	$scope.verse_table_primary_key = "id";
	$scope.isVerseLoaded=false;
	
	//List
	$scope.getBooksList = function(){
		//console.log("SELECT * FROM "+$scope.books_table_name)
		basel.database.runAsync("SELECT * FROM "+$scope.books_table_name, function(data){
			$scope.booksList = data;
			$scope.getVerseList();
		});
	}
	$scope.getVerseList = function(){
		($scope.selectedBook==''||typeof ($scope.selectedBook)=='undefined')?$scope.selectedBook=$scope.booksList[0]:'';
		(typeof ($scope.selectedChapter)=='undefined')?$scope.selectedChapter=1:'';
		//console.log("SELECT * FROM "+$scope.verse_table_name+" WHERE book_id="+$scope.selectedBook.id+" AND chapter_num="+$scope.selectedChapter)
		basel.database.runAsync("SELECT * FROM "+$scope.verse_table_name+" WHERE book_id="+$scope.selectedBook.id+" AND chapter_num="+$scope.selectedChapter, function(data){
			console.log(data);
			delete $scope.verseList;
			console.log($scope.verseList);
			$scope.verseList = data;
			$scope.isVerseLoaded=true;
		});
	}
	$scope.selectBook=function(book){
		$scope.selectedBook=book;
		$scope.isVerseLoaded=false;
		delete $scope.selectedChapter;
		$('.sidebar-overlay').trigger('click')
		$scope.getVerseList();
	}
	$scope.decrementChapter=function(){
		if($scope.selectedChapter>1){
			$scope.isVerseLoaded=false;
			$scope.selectedChapter=$scope.selectedChapter-1
			$scope.getVerseList();
		}
	}
	$scope.incrementChapter=function(){
		if($scope.selectedChapter<$scope.selectedBook.chapters){
			$scope.isVerseLoaded=false;
			$scope.selectedChapter=$scope.selectedChapter+1
			$scope.getVerseList();
		}
	}

});
app.filter('highlight', function($sce) {
    return function(text, phrase) {
    	if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="highlighted">$1</span>')
      		return $sce.trustAsHtml(text)
    }
 })